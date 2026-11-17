"""Google Ads Account Audit for aiautomationcoach.com"""

import os
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

load_dotenv()

def get_client():
    config = {
        "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
        "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
        "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
        "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
        "login_customer_id": os.getenv("GOOGLE_ADS_CUSTOMER_ID"),
        "use_proto_plus": True,
    }
    return GoogleAdsClient.load_from_dict(config)

def audit_campaigns(client, customer_id):
    ga_service = client.get_service("GoogleAdsService")
    query = """
        SELECT
            campaign.id,
            campaign.name,
            campaign.status,
            campaign.advertising_channel_type,
            campaign.bidding_strategy_type,
            campaign_budget.amount_micros,
            metrics.impressions,
            metrics.clicks,
            metrics.cost_micros,
            metrics.conversions,
            metrics.average_cpc,
            metrics.ctr
        FROM campaign
        WHERE segments.date DURING LAST_30_DAYS
        ORDER BY metrics.cost_micros DESC
    """
    print("\n=== CAMPAIGNS (Last 30 days) ===")
    response = ga_service.search(customer_id=customer_id, query=query)
    campaigns = list(response)
    if not campaigns:
        print("No campaign data found.")
        return
    for row in campaigns:
        c = row.campaign
        b = row.campaign_budget
        m = row.metrics
        budget = b.amount_micros / 1_000_000 if b.amount_micros else 0
        cost = m.cost_micros / 1_000_000 if m.cost_micros else 0
        avg_cpc = m.average_cpc / 1_000_000 if m.average_cpc else 0
        cpl = cost / m.conversions if m.conversions > 0 else "N/A"
        print(f"\n  Campaign: {c.name}")
        print(f"  Status:   {c.status.name}")
        print(f"  Type:     {c.advertising_channel_type.name}")
        print(f"  Bidding:  {c.bidding_strategy_type.name}")
        print(f"  Budget:   €{budget:.2f}/day")
        print(f"  Spend:    €{cost:.2f} | Clicks: {m.clicks} | Impressions: {m.impressions}")
        print(f"  CTR:      {m.ctr*100:.2f}% | Avg CPC: €{avg_cpc:.2f}")
        print(f"  Conversions: {m.conversions:.1f} | CPL: {f'€{cpl:.2f}' if cpl != 'N/A' else 'N/A'}")

def audit_keywords(client, customer_id):
    ga_service = client.get_service("GoogleAdsService")
    query = """
        SELECT
            ad_group_criterion.keyword.text,
            ad_group_criterion.keyword.match_type,
            ad_group_criterion.status,
            ad_group_criterion.quality_info.quality_score,
            campaign.name,
            metrics.clicks,
            metrics.impressions,
            metrics.cost_micros,
            metrics.conversions,
            metrics.ctr
        FROM keyword_view
        WHERE segments.date DURING LAST_30_DAYS
          AND ad_group_criterion.status != 'REMOVED'
        ORDER BY metrics.cost_micros DESC
        LIMIT 20
    """
    print("\n=== TOP 20 KEYWORDS (Last 30 days) ===")
    response = ga_service.search(customer_id=customer_id, query=query)
    rows = list(response)
    if not rows:
        print("No keyword data found.")
        return
    for row in rows:
        kw = row.ad_group_criterion.keyword
        m = row.metrics
        qs = row.ad_group_criterion.quality_info.quality_score
        cost = m.cost_micros / 1_000_000 if m.cost_micros else 0
        print(f"  [{kw.match_type.name}] {kw.text} | QS: {qs} | Clicks: {m.clicks} | Cost: €{cost:.2f} | Conv: {m.conversions:.1f}")

def audit_ads(client, customer_id):
    ga_service = client.get_service("GoogleAdsService")
    query = """
        SELECT
            ad_group_ad.ad.responsive_search_ad.headlines,
            ad_group_ad.ad.final_urls,
            ad_group_ad.status,
            ad_group_ad.ad.id,
            campaign.name,
            metrics.clicks,
            metrics.impressions,
            metrics.ctr,
            metrics.conversions
        FROM ad_group_ad
        WHERE segments.date DURING LAST_30_DAYS
          AND ad_group_ad.status != 'REMOVED'
        ORDER BY metrics.impressions DESC
        LIMIT 10
    """
    print("\n=== TOP ADS (Last 30 days) ===")
    response = ga_service.search(customer_id=customer_id, query=query)
    rows = list(response)
    if not rows:
        print("No ad data found.")
        return
    for row in rows:
        ad = row.ad_group_ad.ad
        m = row.metrics
        headlines = [h.text for h in ad.responsive_search_ad.headlines[:3]] if ad.responsive_search_ad.headlines else ["N/A"]
        print(f"\n  Campaign: {row.campaign.name}")
        print(f"  Headlines: {' | '.join(headlines)}")
        print(f"  CTR: {m.ctr*100:.2f}% | Clicks: {m.clicks} | Conv: {m.conversions:.1f}")

def main():
    customer_id = os.getenv("GOOGLE_ADS_CUSTOMER_ID")
    print(f"Auditing Google Ads account: {customer_id}")
    print("="*50)

    try:
        client = get_client()
        audit_campaigns(client, customer_id)
        audit_keywords(client, customer_id)
        audit_ads(client, customer_id)
        print("\n=== AUDIT COMPLETE ===")
    except GoogleAdsException as ex:
        print(f"\nGoogle Ads API Error: {ex.error.code().name}")
        for error in ex.failure.errors:
            print(f"  {error.message}")
    except Exception as ex:
        print(f"\nError: {ex}")

if __name__ == "__main__":
    main()
