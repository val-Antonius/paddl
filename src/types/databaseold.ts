export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          member_id: string;
          name: string;
          email: string;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          member_id: string;
          name: string;
          email: string;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          member_id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          updated_at?: string;
        };
        Relationships: {
          foreignKeyName: string;
          columns: string[];
          isOneToOne?: boolean;
          referencedRelation: string;
          referencedColumns: string[];
        }[];
      };
      courts: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          is_active?: boolean;
          updated_at?: string;
        };
        Relationships: {
          foreignKeyName: string;
          columns: string[];
          isOneToOne?: boolean;
          referencedRelation: string;
          referencedColumns: string[];
        }[];
      };
      bookings: {
        Row: {
          id: string;
          user_id: string;
          booking_number: string;
          booking_date: string;
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
          total_amount: number;
          admin_fee: number;
          payment_status: 'unpaid' | 'paid' | 'refunded';
          payment_method: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          booking_number: string;
          booking_date: string;
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
          total_amount: number;
          admin_fee?: number;
          payment_status?: 'unpaid' | 'paid' | 'refunded';
          payment_method?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          booking_number?: string;
          booking_date?: string;
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
          total_amount?: number;
          admin_fee?: number;
          payment_status?: 'unpaid' | 'paid' | 'refunded';
          payment_method?: string | null;
          notes?: string | null;
          updated_at?: string;
        };
        Relationships: {
          foreignKeyName: string;
          columns: string[];
          isOneToOne?: boolean;
          referencedRelation: string;
          referencedColumns: string[];
        }[];
      };
      booking_slots: {
        Row: {
          id: string;
          booking_id: string;
          court_id: string;
          booking_date: string;
          time_slot: string;
          session: 'day' | 'night';
          price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          court_id: string;
          booking_date: string;
          time_slot: string;
          session: 'day' | 'night';
          price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          court_id?: string;
          booking_date?: string;
          time_slot?: string;
          session?: 'day' | 'night';
          price?: number;
        };
        Relationships: {
          foreignKeyName: string;
          columns: string[];
          isOneToOne?: boolean;
          referencedRelation: string;
          referencedColumns: string[];
        }[];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: {
        Args: Record<string, never>;
        Returns: never;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
};

// Helper types
export type User = Database['public']['Tables']['users']['Row'];
export type Court = Database['public']['Tables']['courts']['Row'];
export type Booking = Database['public']['Tables']['bookings']['Row'];
export type BookingSlot = Database['public']['Tables']['booking_slots']['Row'];

export type InsertUser = Database['public']['Tables']['users']['Insert'];
export type InsertCourt = Database['public']['Tables']['courts']['Insert'];
export type InsertBooking = Database['public']['Tables']['bookings']['Insert'];
export type InsertBookingSlot = Database['public']['Tables']['booking_slots']['Insert'];