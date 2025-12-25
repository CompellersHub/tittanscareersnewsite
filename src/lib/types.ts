export interface Preferences {
  email_receipts: boolean;
  payment_reminders: boolean;
  payment_confirmations: boolean;
  course_access_notifications: boolean;
  marketing_emails: boolean;
}

export interface Order {
  id: string;
  course_title: string;
  course_slug: string;
  price: number;
  purchase_date: string;
  payment_method: string | null;
  display_status: string;
  payment_reference: string | null;
  expires_at: string | null;
  payment_proof_urls: string[] | null;
  verified_at: string | null;
}