export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      booking_slots: {
        Row: {
          booking_active: boolean | null
          booking_date: string
          booking_id: string
          court_id: string
          created_at: string | null
          id: string
          price: number
          session: string
          slot_datetime: string | null
          time_slot: string
        }
        Insert: {
          booking_active?: boolean | null
          booking_date: string
          booking_id: string
          court_id: string
          created_at?: string | null
          id?: string
          price: number
          session: string
          slot_datetime?: string | null
          time_slot: string
        }
        Update: {
          booking_active?: boolean | null
          booking_date?: string
          booking_id?: string
          court_id?: string
          created_at?: string | null
          id?: string
          price?: number
          session?: string
          slot_datetime?: string | null
          time_slot?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_slots_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_slots_court_id_fkey"
            columns: ["court_id"]
            isOneToOne: false
            referencedRelation: "courts"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          admin_fee: number | null
          booking_date: string
          booking_number: string
          created_at: string | null
          id: string
          midtrans_order_id: string | null
          midtrans_redirect_url: string | null
          midtrans_snap_token: string | null
          midtrans_transaction_id: string | null
          notes: string | null
          paid_at: string | null
          payment_expired_at: string | null
          payment_method: string | null
          payment_status: string | null
          status: string
          total_amount: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          admin_fee?: number | null
          booking_date: string
          booking_number: string
          created_at?: string | null
          id?: string
          midtrans_order_id?: string | null
          midtrans_redirect_url?: string | null
          midtrans_snap_token?: string | null
          midtrans_transaction_id?: string | null
          notes?: string | null
          paid_at?: string | null
          payment_expired_at?: string | null
          payment_method?: string | null
          payment_status?: string | null
          status?: string
          total_amount: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          admin_fee?: number | null
          booking_date?: string
          booking_number?: string
          created_at?: string | null
          id?: string
          midtrans_order_id?: string | null
          midtrans_redirect_url?: string | null
          midtrans_snap_token?: string | null
          midtrans_transaction_id?: string | null
          notes?: string | null
          paid_at?: string | null
          payment_expired_at?: string | null
          payment_method?: string | null
          payment_status?: string | null
          status?: string
          total_amount?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      courts: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      payment_logs: {
        Row: {
          booking_id: string | null
          created_at: string | null
          event_type: string
          fraud_status: string | null
          id: string
          midtrans_response: Json | null
          notes: string | null
          status_code: string | null
          transaction_status: string | null
        }
        Insert: {
          booking_id?: string | null
          created_at?: string | null
          event_type: string
          fraud_status?: string | null
          id?: string
          midtrans_response?: Json | null
          notes?: string | null
          status_code?: string | null
          transaction_status?: string | null
        }
        Update: {
          booking_id?: string | null
          created_at?: string | null
          event_type?: string
          fraud_status?: string | null
          id?: string
          midtrans_response?: Json | null
          notes?: string | null
          status_code?: string | null
          transaction_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_logs_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          email_verified: boolean | null
          id: string
          is_active: boolean | null
          member_id: string
          name: string
          password_hash: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          email_verified?: boolean | null
          id?: string
          is_active?: boolean | null
          member_id?: string
          name: string
          password_hash: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          email_verified?: boolean | null
          id?: string
          is_active?: boolean | null
          member_id?: string
          name?: string
          password_hash?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      expire_unpaid_bookings: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      generate_member_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_slot_available: {
        Args: {
          p_booking_date: string
          p_court_id: string
          p_time_slot: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

// ============================
// Helper types for convenience
// ============================

export type User = Tables<'users'>
export type Court = Tables<'courts'>
export type Booking = Tables<'bookings'>
export type BookingSlot = Tables<'booking_slots'>
export type PaymentLog = Tables<'payment_logs'>

export type InsertUser = TablesInsert<'users'>
export type InsertCourt = TablesInsert<'courts'>
export type InsertBooking = TablesInsert<'bookings'>
export type InsertBookingSlot = TablesInsert<'booking_slots'>
export type InsertPaymentLog = TablesInsert<'payment_logs'>

export type UpdateUser = TablesUpdate<'users'>
export type UpdateCourt = TablesUpdate<'courts'>
export type UpdateBooking = TablesUpdate<'bookings'>
export type UpdateBookingSlot = TablesUpdate<'booking_slots'>
export type UpdatePaymentLog = TablesUpdate<'payment_logs'>