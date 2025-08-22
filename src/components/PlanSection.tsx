import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Spin, Alert } from 'antd';
import PlanCard from './PlanCard';
import styles from '../styles/custom/planSection.module.less';

const { Title } = Typography;

// Types for API data
interface Plan {
  plan_id: number;
  plan_name: string;
  plan_type: string;
  country_id: number;
  credit: number;
  monthly_price: string;
  annual_price: string;
  price: string;
  validity_duration: number;
  start_date: string;
  end_date: string;
  is_active: number;
  display_on_landing: number;
  language: string;
  description: string;
  is_deleted: number;
  created_at: string;
  updated_at: string;
  country_name: string;
  currency: string;
}

// Removed Country interface and state - no longer needed!
// Plans now include country data directly from backend JOIN

interface PlanSectionProps {
  region: string;
}

const API_BASE_URL = 'http://localhost:5001';

const PlanSection: React.FC<PlanSectionProps> = ({ region }) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // SIMPLIFIED - Single API call to get all landing plans with country data
  const fetchAllPlans = async (): Promise<Plan[]> => {
    // NEW - Use the dedicated landing plans endpoint
    try {
      const response = await fetch(`${API_BASE_URL}/api/public/plans/landing`);
      if (!response.ok) throw new Error('Failed to fetch landing plans');
      return await response.json();
    } catch (error) {
      console.error('Error fetching landing plans:', error);
      return [];
    }
  };

  const formatPrice = (price: string, currency: string = 'INR'): string => {
    if (!price || price === '0') return 'Free';
    const numPrice = parseFloat(price);
    
    // Handle different currency formats
    if (currency === 'INR') return `₹${numPrice.toFixed(0)}`;
    if (currency === 'USD') return `$${numPrice.toFixed(0)}`;
    if (currency === 'AED') return `د.إ ${numPrice.toFixed(0)}`;
    
    // Default format for other currencies
    return `${currency}${numPrice.toFixed(0)}`;
  };

  useEffect(() => {
    fetchPlansData();
  }, []);

  const fetchPlansData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // SIMPLIFIED - No need for countries endpoint anymore!
      // Get all landing plans with country data included
      const plansData = await fetchAllPlans();
      setPlans(plansData);
      
    } catch (err) {
      console.error('Error fetching plans data:', err);
      setError('Failed to load plans data');
    } finally {
      setLoading(false);
    }
  };

  // Convert backend plan data to frontend format
  const convertPlanToFeatureFormat = (plan: Plan) => {
    // Build price object using plan's included country data
    const priceObject: Record<string, string> = {};
    
    // Use the country data that comes with the plan (from JOIN query)
    if (plan.currency) {
      const regionCode = getRegionCodeFromCurrency(plan.currency);
      const formattedPrice = formatPrice(plan.monthly_price, plan.currency);
      priceObject[regionCode] = formattedPrice;
    }

    return {
      title: plan.plan_name,
      price: priceObject,
      worksheets: `${plan.credit} Credits`,
      buttonLabel: plan.monthly_price === '0' || parseFloat(plan.monthly_price) === 0 ? 'Get Started' : 'Contact Sales',
      highlight: plan.plan_type === 'Pro', // Only Pro plans are highlighted
      htmlDescription: plan.description || '', // Pass HTML description directly
      tag: plan.plan_type === 'Pro' ? 'Most Popular' : undefined, // Only Pro gets the badge
    };
  };

  // Helper function to get region code from currency
  const getRegionCodeFromCurrency = (currency: string): string => {
    if (currency === 'INR') return 'IN';
    if (currency === 'USD') return 'US';
    if (currency === 'AED') return 'AE';
    return 'IN'; // Default to India
  };

  if (loading) {
    return (
      <div className={styles.pageSection}>
        <Title level={2} className={styles.sectionTitle}>
          Choose Your Perfect Plan
        </Title>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageSection}>
        <Title level={2} className={styles.sectionTitle}>
          Choose Your Perfect Plan
        </Title>
        <Alert
          message="Unable to load plans"
          description="Please check your connection and try again."
          type="error"
          showIcon
          style={{ margin: '1rem 0' }}
        />
      </div>
    );
  }

  // If no plans available for landing page
  if (plans.length === 0) {
    return (
      <div className={styles.pageSection}>
        <Title level={2} className={styles.sectionTitle}>
          Choose Your Perfect Plan
        </Title>
        <Alert
          message="No plans available"
          description="No plans are currently configured for display."
          type="info"
          showIcon
          style={{ margin: '1rem 0' }}
        />
      </div>
    );
  }

  // Show dynamic plans from backend
  return (
    <div className={styles.pageSection}>
      <Title level={2} className={styles.sectionTitle}>
        Choose Your Perfect Plan
      </Title>

      <Title level={3} className={styles.sectionSubtitle}>
        Affordable pricing for every educator worldwide
      </Title>

      <Row gutter={[32, 40]} justify="center">
        {plans
          .sort((a, b) => {
            // Sort order: Basic/Starter first, Pro second, School third
            const order = { 'Basic': 1, 'Starter': 1, 'Pro': 2, 'School': 3 };
            const aOrder = order[a.plan_type as keyof typeof order] || 999;
            const bOrder = order[b.plan_type as keyof typeof order] || 999;
            return aOrder - bOrder;
          })
          .map((plan) => {
            const planFeature = convertPlanToFeatureFormat(plan);
            // Use the plan's currency to determine region
            const planRegion = getRegionCodeFromCurrency(plan.currency || 'INR');
            
            return (
              <Col xs={24} sm={12} md={8} lg={6} key={plan.plan_id}>
                <PlanCard 
                  {...planFeature} 
                  region={planRegion} 
                />
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default PlanSection;
