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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      attractions: {
        Row: {
          country_id: string
          description: string | null
          elevation_m: number | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          region_id: string | null
          slug: string
          type: string
        }
        Insert: {
          country_id: string
          description?: string | null
          elevation_m?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          region_id?: string | null
          slug: string
          type?: string
        }
        Update: {
          country_id?: string
          description?: string | null
          elevation_m?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          region_id?: string | null
          slug?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "attractions_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attractions_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      cities: {
        Row: {
          country_id: string
          description: string | null
          elevation_m: number | null
          has_airport: boolean
          id: string
          is_major: boolean
          latitude: number
          longitude: number
          name: string
          region_id: string | null
          slug: string
        }
        Insert: {
          country_id: string
          description?: string | null
          elevation_m?: number | null
          has_airport?: boolean
          id?: string
          is_major?: boolean
          latitude: number
          longitude: number
          name: string
          region_id?: string | null
          slug: string
        }
        Update: {
          country_id?: string
          description?: string | null
          elevation_m?: number | null
          has_airport?: boolean
          id?: string
          is_major?: boolean
          latitude?: number
          longitude?: number
          name?: string
          region_id?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "cities_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cities_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      cost_estimates: {
        Row: {
          amount_max: number
          amount_min: number
          category: string
          currency: string
          destination_id: string | null
          id: string
          note: string | null
          route_id: string | null
        }
        Insert: {
          amount_max: number
          amount_min: number
          category: string
          currency?: string
          destination_id?: string | null
          id?: string
          note?: string | null
          route_id?: string | null
        }
        Update: {
          amount_max?: number
          amount_min?: number
          category?: string
          currency?: string
          destination_id?: string | null
          id?: string
          note?: string | null
          route_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cost_estimates_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cost_estimates_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "trekking_routes"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          created_at: string
          description: string | null
          hero_image: string | null
          id: string
          is_active: boolean
          iso_code: string
          latitude: number
          longitude: number
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          hero_image?: string | null
          id?: string
          is_active?: boolean
          iso_code: string
          latitude: number
          longitude: number
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          hero_image?: string | null
          id?: string
          is_active?: boolean
          iso_code?: string
          latitude?: number
          longitude?: number
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      destinations: {
        Row: {
          best_season: string | null
          country_id: string
          created_at: string
          currency: string
          description: string | null
          difficulty: string | null
          distance_km: number | null
          duration_days: string | null
          estimated_cost_max: number | null
          estimated_cost_min: number | null
          id: string
          image: string | null
          is_featured: boolean
          latitude: number | null
          longitude: number | null
          name: string
          region_id: string | null
          short_description: string | null
          slug: string
          type: string
          updated_at: string
        }
        Insert: {
          best_season?: string | null
          country_id: string
          created_at?: string
          currency?: string
          description?: string | null
          difficulty?: string | null
          distance_km?: number | null
          duration_days?: string | null
          estimated_cost_max?: number | null
          estimated_cost_min?: number | null
          id?: string
          image?: string | null
          is_featured?: boolean
          latitude?: number | null
          longitude?: number | null
          name: string
          region_id?: string | null
          short_description?: string | null
          slug: string
          type?: string
          updated_at?: string
        }
        Update: {
          best_season?: string | null
          country_id?: string
          created_at?: string
          currency?: string
          description?: string | null
          difficulty?: string | null
          distance_km?: number | null
          duration_days?: string | null
          estimated_cost_max?: number | null
          estimated_cost_min?: number | null
          id?: string
          image?: string | null
          is_featured?: boolean
          latitude?: number | null
          longitude?: number | null
          name?: string
          region_id?: string | null
          short_description?: string | null
          slug?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "destinations_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "destinations_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      regions: {
        Row: {
          country_id: string
          created_at: string
          description: string | null
          hero_image: string | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          slug: string
        }
        Insert: {
          country_id: string
          created_at?: string
          description?: string | null
          hero_image?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          slug: string
        }
        Update: {
          country_id?: string
          created_at?: string
          description?: string | null
          hero_image?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "regions_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      road_routes: {
        Row: {
          country_id: string
          flight_minutes: number | null
          from_lat: number | null
          from_lng: number | null
          from_name: string
          id: string
          is_approximate: boolean
          mode: string
          note: string | null
          road_distance_km: number | null
          road_hours: number | null
          to_lat: number | null
          to_lng: number | null
          to_name: string
        }
        Insert: {
          country_id: string
          flight_minutes?: number | null
          from_lat?: number | null
          from_lng?: number | null
          from_name: string
          id?: string
          is_approximate?: boolean
          mode?: string
          note?: string | null
          road_distance_km?: number | null
          road_hours?: number | null
          to_lat?: number | null
          to_lng?: number | null
          to_name: string
        }
        Update: {
          country_id?: string
          flight_minutes?: number | null
          from_lat?: number | null
          from_lng?: number | null
          from_name?: string
          id?: string
          is_approximate?: boolean
          mode?: string
          note?: string | null
          road_distance_km?: number | null
          road_hours?: number | null
          to_lat?: number | null
          to_lng?: number | null
          to_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "road_routes_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      route_stops: {
        Row: {
          day_number: number | null
          description: string | null
          distance_from_previous_km: number | null
          elevation_m: number | null
          id: string
          latitude: number
          longitude: number
          name: string
          route_id: string
          sort_order: number
          transport_mode: string
        }
        Insert: {
          day_number?: number | null
          description?: string | null
          distance_from_previous_km?: number | null
          elevation_m?: number | null
          id?: string
          latitude: number
          longitude: number
          name: string
          route_id: string
          sort_order?: number
          transport_mode?: string
        }
        Update: {
          day_number?: number | null
          description?: string | null
          distance_from_previous_km?: number | null
          elevation_m?: number | null
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          route_id?: string
          sort_order?: number
          transport_mode?: string
        }
        Relationships: [
          {
            foreignKeyName: "route_stops_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "trekking_routes"
            referencedColumns: ["id"]
          },
        ]
      }
      trekking_routes: {
        Row: {
          accommodation: string | null
          best_season: string | null
          country_id: string
          created_at: string
          currency: string
          description: string | null
          difficulty: string | null
          distance_km: number | null
          duration_days: string | null
          elevation_max_m: number | null
          end_location: string | null
          estimated_cost_max: number | null
          estimated_cost_min: number | null
          food: string | null
          hero_image: string | null
          id: string
          is_featured: boolean
          name: string
          permits: string | null
          region_id: string | null
          safety: string | null
          short_description: string | null
          slug: string
          start_location: string | null
          transportation: string | null
          updated_at: string
        }
        Insert: {
          accommodation?: string | null
          best_season?: string | null
          country_id: string
          created_at?: string
          currency?: string
          description?: string | null
          difficulty?: string | null
          distance_km?: number | null
          duration_days?: string | null
          elevation_max_m?: number | null
          end_location?: string | null
          estimated_cost_max?: number | null
          estimated_cost_min?: number | null
          food?: string | null
          hero_image?: string | null
          id?: string
          is_featured?: boolean
          name: string
          permits?: string | null
          region_id?: string | null
          safety?: string | null
          short_description?: string | null
          slug: string
          start_location?: string | null
          transportation?: string | null
          updated_at?: string
        }
        Update: {
          accommodation?: string | null
          best_season?: string | null
          country_id?: string
          created_at?: string
          currency?: string
          description?: string | null
          difficulty?: string | null
          distance_km?: number | null
          duration_days?: string | null
          elevation_max_m?: number | null
          end_location?: string | null
          estimated_cost_max?: number | null
          estimated_cost_min?: number | null
          food?: string | null
          hero_image?: string | null
          id?: string
          is_featured?: boolean
          name?: string
          permits?: string | null
          region_id?: string | null
          safety?: string | null
          short_description?: string | null
          slug?: string
          start_location?: string | null
          transportation?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trekking_routes_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trekking_routes_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
