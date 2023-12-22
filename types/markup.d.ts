export interface Commission {
  markup_commission_tenants: string; // Alterado para string[]
  markup_commission_commission_pay: number;
  markup_commission_commission_receive: string;
  markup_commission_title: string;
  markup_commission_is_active: boolean;
  markup_commission_markup_id: number;
}

export interface Rule {
  markup_rule_type: string;
  markup_rule_period_inicial: string;
  markup_rule_period_final: string;
  markup_rule_days: number;
  markup_rule_hotels_ids: number[];
  markup_rule_hotels_names: string[];
  markup_rule_value: number;
  markup_rule_is_active: boolean;
}

export interface Markup {
  markup_id: string;
  markup_priority: number;
  markup_type: number;
  markup_tenants: string; // Alterado para string[]
  markup_aplied: number;
  markup_received: number;
  markup_title: string;
  markup_is_active: boolean;
  markup_commission: Commission[];
  markup_rules: Rule[];
}

export interface ListMarkups extends Array<Markup> {}
