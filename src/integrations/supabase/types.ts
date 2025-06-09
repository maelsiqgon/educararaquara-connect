export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          ip_address: unknown | null
          resource_id: string | null
          resource_type: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      agenda_events: {
        Row: {
          all_day: boolean | null
          attendees: string[] | null
          created_at: string | null
          created_by: string | null
          description: string | null
          end_datetime: string
          event_type: Database["public"]["Enums"]["event_type"] | null
          external_calendar_id: string | null
          id: string
          location: string | null
          recurring: boolean | null
          recurring_pattern: Json | null
          school_id: string | null
          start_datetime: string
          title: string
          updated_at: string | null
        }
        Insert: {
          all_day?: boolean | null
          attendees?: string[] | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_datetime: string
          event_type?: Database["public"]["Enums"]["event_type"] | null
          external_calendar_id?: string | null
          id?: string
          location?: string | null
          recurring?: boolean | null
          recurring_pattern?: Json | null
          school_id?: string | null
          start_datetime: string
          title: string
          updated_at?: string | null
        }
        Update: {
          all_day?: boolean | null
          attendees?: string[] | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          end_datetime?: string
          event_type?: Database["public"]["Enums"]["event_type"] | null
          external_calendar_id?: string | null
          id?: string
          location?: string | null
          recurring?: boolean | null
          recurring_pattern?: Json | null
          school_id?: string | null
          start_datetime?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agenda_events_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      chatbot_knowledge: {
        Row: {
          active: boolean | null
          answer: string
          category: string | null
          created_at: string | null
          created_by: string | null
          id: string
          keywords: string[] | null
          question: string
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          active?: boolean | null
          answer: string
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          keywords?: string[] | null
          question: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          active?: boolean | null
          answer?: string
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          keywords?: string[] | null
          question?: string
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      council_documents: {
        Row: {
          council_id: string | null
          created_at: string | null
          description: string | null
          document_type: string | null
          file_path: string
          file_size: number | null
          id: string
          meeting_date: string | null
          month: number | null
          title: string
          uploaded_by: string | null
          year: number | null
        }
        Insert: {
          council_id?: string | null
          created_at?: string | null
          description?: string | null
          document_type?: string | null
          file_path: string
          file_size?: number | null
          id?: string
          meeting_date?: string | null
          month?: number | null
          title: string
          uploaded_by?: string | null
          year?: number | null
        }
        Update: {
          council_id?: string | null
          created_at?: string | null
          description?: string | null
          document_type?: string | null
          file_path?: string
          file_size?: number | null
          id?: string
          meeting_date?: string | null
          month?: number | null
          title?: string
          uploaded_by?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "council_documents_council_id_fkey"
            columns: ["council_id"]
            isOneToOne: false
            referencedRelation: "councils"
            referencedColumns: ["id"]
          },
        ]
      }
      council_financial_records: {
        Row: {
          council_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          document_path: string | null
          expenses: number | null
          id: string
          month: number
          revenue: number | null
          year: number
        }
        Insert: {
          council_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          document_path?: string | null
          expenses?: number | null
          id?: string
          month: number
          revenue?: number | null
          year: number
        }
        Update: {
          council_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          document_path?: string | null
          expenses?: number | null
          id?: string
          month?: number
          revenue?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "council_financial_records_council_id_fkey"
            columns: ["council_id"]
            isOneToOne: false
            referencedRelation: "councils"
            referencedColumns: ["id"]
          },
        ]
      }
      council_members: {
        Row: {
          active: boolean | null
          council_id: string | null
          created_at: string | null
          email: string | null
          end_date: string | null
          id: string
          name: string
          phone: string | null
          position: string | null
          start_date: string
        }
        Insert: {
          active?: boolean | null
          council_id?: string | null
          created_at?: string | null
          email?: string | null
          end_date?: string | null
          id?: string
          name: string
          phone?: string | null
          position?: string | null
          start_date: string
        }
        Update: {
          active?: boolean | null
          council_id?: string | null
          created_at?: string | null
          email?: string | null
          end_date?: string | null
          id?: string
          name?: string
          phone?: string | null
          position?: string | null
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "council_members_council_id_fkey"
            columns: ["council_id"]
            isOneToOne: false
            referencedRelation: "councils"
            referencedColumns: ["id"]
          },
        ]
      }
      council_school_visits: {
        Row: {
          council_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          observations: string | null
          report_file_path: string | null
          school_id: string | null
          visit_date: string
          visitor_name: string
        }
        Insert: {
          council_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          observations?: string | null
          report_file_path?: string | null
          school_id?: string | null
          visit_date: string
          visitor_name: string
        }
        Update: {
          council_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          observations?: string | null
          report_file_path?: string | null
          school_id?: string | null
          visit_date?: string
          visitor_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "council_school_visits_council_id_fkey"
            columns: ["council_id"]
            isOneToOne: false
            referencedRelation: "councils"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "council_school_visits_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      councils: {
        Row: {
          active: boolean | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          regulation_text: string | null
          type: Database["public"]["Enums"]["council_type"]
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          regulation_text?: string | null
          type: Database["public"]["Enums"]["council_type"]
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          regulation_text?: string | null
          type?: Database["public"]["Enums"]["council_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text: string | null
          created_at: string | null
          description: string | null
          file_path: string
          file_size: number | null
          filename: string
          folder: string | null
          id: string
          mime_type: string | null
          original_name: string
          school_id: string | null
          tags: string[] | null
          uploaded_by: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          description?: string | null
          file_path: string
          file_size?: number | null
          filename: string
          folder?: string | null
          id?: string
          mime_type?: string | null
          original_name: string
          school_id?: string | null
          tags?: string[] | null
          uploaded_by?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          description?: string | null
          file_path?: string
          file_size?: number | null
          filename?: string
          folder?: string | null
          id?: string
          mime_type?: string | null
          original_name?: string
          school_id?: string | null
          tags?: string[] | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_library_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          author_id: string | null
          category_id: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          scheduled_at: string | null
          school_id: string | null
          slug: string
          status: Database["public"]["Enums"]["news_status"] | null
          tags: string[] | null
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author_id?: string | null
          category_id?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          scheduled_at?: string | null
          school_id?: string | null
          slug: string
          status?: Database["public"]["Enums"]["news_status"] | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author_id?: string | null
          category_id?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          scheduled_at?: string | null
          school_id?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["news_status"] | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "news_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "news_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "news_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      news_categories: {
        Row: {
          active: boolean | null
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          active?: boolean | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          active?: boolean | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      pages: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string
          featured: boolean
          id: string
          image_url: string | null
          meta_description: string | null
          meta_title: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category?: string
          content: string
          created_at?: string
          featured?: boolean
          id?: string
          image_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string
          featured?: boolean
          id?: string
          image_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          active: boolean
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          last_access: string | null
          name: string
          phone: string | null
          role: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          avatar_url?: string | null
          created_at?: string
          email: string
          id: string
          last_access?: string | null
          name: string
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          last_access?: string | null
          name?: string
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      school_contacts: {
        Row: {
          created_at: string | null
          id: string
          label: string | null
          primary_contact: boolean | null
          school_id: string | null
          type: Database["public"]["Enums"]["contact_type"]
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          label?: string | null
          primary_contact?: boolean | null
          school_id?: string | null
          type: Database["public"]["Enums"]["contact_type"]
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          label?: string | null
          primary_contact?: boolean | null
          school_id?: string | null
          type?: Database["public"]["Enums"]["contact_type"]
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "school_contacts_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          active: boolean | null
          address: string | null
          classes: number | null
          created_at: string | null
          description: string | null
          director: string | null
          id: string
          image_url: string | null
          name: string
          students: number | null
          teachers: number | null
          type: Database["public"]["Enums"]["school_type"]
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          address?: string | null
          classes?: number | null
          created_at?: string | null
          description?: string | null
          director?: string | null
          id?: string
          image_url?: string | null
          name: string
          students?: number | null
          teachers?: number | null
          type: Database["public"]["Enums"]["school_type"]
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          address?: string | null
          classes?: number | null
          created_at?: string | null
          description?: string | null
          director?: string | null
          id?: string
          image_url?: string | null
          name?: string
          students?: number | null
          teachers?: number | null
          type?: Database["public"]["Enums"]["school_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          description: string
          id: string
          priority: number | null
          resolution: string | null
          resolved_at: string | null
          school_id: string | null
          status: Database["public"]["Enums"]["ticket_status"] | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          description: string
          id?: string
          priority?: number | null
          resolution?: string | null
          resolved_at?: string | null
          school_id?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          description?: string
          id?: string
          priority?: number | null
          resolution?: string | null
          resolved_at?: string | null
          school_id?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_messages: {
        Row: {
          created_at: string | null
          id: string
          is_internal: boolean | null
          message: string
          ticket_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          message: string
          ticket_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_internal?: boolean | null
          message?: string
          ticket_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_settings: {
        Row: {
          active: boolean | null
          api_key: string
          api_url: string
          created_at: string | null
          id: string
          instance_name: string
          phone_number: string | null
          updated_at: string | null
          webhook_url: string | null
        }
        Insert: {
          active?: boolean | null
          api_key: string
          api_url: string
          created_at?: string | null
          id?: string
          instance_name: string
          phone_number?: string | null
          updated_at?: string | null
          webhook_url?: string | null
        }
        Update: {
          active?: boolean | null
          api_key?: string
          api_url?: string
          created_at?: string | null
          id?: string
          instance_name?: string
          phone_number?: string | null
          updated_at?: string | null
          webhook_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_uuid?: string }
        Returns: boolean
      }
      is_super_admin: {
        Args: { user_uuid?: string }
        Returns: boolean
      }
    }
    Enums: {
      contact_type: "phone" | "cellphone" | "whatsapp" | "email"
      council_type: "FUNDEB" | "CAE" | "CME" | "CACS"
      event_type: "meeting" | "conference" | "visit" | "event"
      news_status: "draft" | "scheduled" | "published" | "archived"
      school_type: "EMEI" | "EMEF" | "CEMEI" | "Creche"
      ticket_status: "open" | "in_progress" | "resolved" | "closed"
      user_role:
        | "super_admin"
        | "admin"
        | "editor"
        | "viewer"
        | "director"
        | "coordinator"
        | "teacher"
        | "staff"
        | "parent"
        | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      contact_type: ["phone", "cellphone", "whatsapp", "email"],
      council_type: ["FUNDEB", "CAE", "CME", "CACS"],
      event_type: ["meeting", "conference", "visit", "event"],
      news_status: ["draft", "scheduled", "published", "archived"],
      school_type: ["EMEI", "EMEF", "CEMEI", "Creche"],
      ticket_status: ["open", "in_progress", "resolved", "closed"],
      user_role: [
        "super_admin",
        "admin",
        "editor",
        "viewer",
        "director",
        "coordinator",
        "teacher",
        "staff",
        "parent",
        "student",
      ],
    },
  },
} as const
