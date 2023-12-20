export interface Commission {
  markup_commission_id: string;
  markup_commission_tenants: string[];
  markup_commission_commission_pay: string;
  markup_commission_commission_receive: string;
  markup_commission_title: string;
  markup_commission_is_active: boolean;
  markup_commission_markup_id: number;
  created_at: string;
  updated_at: string;
}

export interface Rule {
  markup_rule_id: string;
  markup_rule_type: string;
  markup_rule_period_inicial: string;
  markup_rule_period_final: string;
  markup_rule_days: string;
  markup_rule_hotels_ids: string;
  markup_rule_hotels_names: string[];
  markup_rule_value: string;
  markup_rule_is_active: boolean;
  markup_rule_markup_id: number;
  created_at: string;
  updated_at: string;
}

export interface Markup {
  markup_id: string;
  markup_priority: number;
  markup_type: number;
  markup_tenants: string;
  markup_aplied: number;
  markup_received: number;
  markup_title: string;
  markup_is_active: boolean;
  created_at: string;
  updated_at: string;
  markup_commission: Commission[];
  markup_rules: Rule[];
}

export interface ListMarkups extends Array<Markup> {}
