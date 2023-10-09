declare type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

declare interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      task_repeat: {
        Row: {
          created_at: string | null;
          days: number[] | null;
          id: number;
          indefinite: boolean;
          interval: number;
          task_id: number;
          type: Database["public"]["Enums"]["task_repeat_type"];
        };
        Insert: {
          created_at?: string | null;
          days?: number[] | null;
          id?: number;
          indefinite?: boolean;
          interval?: number;
          task_id: number;
          type?: Database["public"]["Enums"]["task_repeat_type"];
        };
        Update: {
          created_at?: string | null;
          days?: number[] | null;
          id?: number;
          indefinite?: boolean;
          interval?: number;
          task_id?: number;
          type?: Database["public"]["Enums"]["task_repeat_type"];
        };
        Relationships: [
          {
            foreignKeyName: "task_repeat_task_id_fkey";
            columns: ["task_id"];
            referencedRelation: "tasks";
            referencedColumns: ["id"];
          }
        ];
      };
      task_steps: {
        Row: {
          completed: boolean;
          created_at: string;
          id: number;
          task_id: number | null;
          title: string | null;
        };
        Insert: {
          completed?: boolean;
          created_at?: string;
          id?: number;
          task_id?: number | null;
          title?: string | null;
        };
        Update: {
          completed?: boolean;
          created_at?: string;
          id?: number;
          task_id?: number | null;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "task_steps_task_id_fkey";
            columns: ["task_id"];
            referencedRelation: "tasks";
            referencedColumns: ["id"];
          }
        ];
      };
      task_tag: {
        Row: {
          blue: boolean;
          created_at: string;
          green: boolean;
          id: number;
          orange: boolean;
          purple: boolean;
          red: boolean;
          task_id: number | null;
          yellow: boolean;
        };
        Insert: {
          blue?: boolean;
          created_at?: string;
          green?: boolean;
          id?: number;
          orange?: boolean;
          purple?: boolean;
          red?: boolean;
          task_id?: number | null;
          yellow?: boolean;
        };
        Update: {
          blue?: boolean;
          created_at?: string;
          green?: boolean;
          id?: number;
          orange?: boolean;
          purple?: boolean;
          red?: boolean;
          task_id?: number | null;
          yellow?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "task_tag_task_id_fkey";
            columns: ["task_id"];
            referencedRelation: "tasks";
            referencedColumns: ["id"];
          }
        ];
      };
      tasks: {
        Row: {
          completed: boolean;
          created_at: string | null;
          date: string | null;
          id: number;
          important: boolean;
          is_my_day: boolean;
          my_day_date: string | null;
          notes: string | null;
          reminder: string | null;
          repeat_id: number | null;
          tag_id: number | null;
          title: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          completed?: boolean;
          created_at?: string | null;
          date?: string | null;
          id?: number;
          important?: boolean;
          is_my_day?: boolean;
          my_day_date?: string | null;
          notes?: string | null;
          reminder?: string | null;
          repeat_id?: number | null;
          tag_id?: number | null;
          title?: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          completed?: boolean;
          created_at?: string | null;
          date?: string | null;
          id?: number;
          important?: boolean;
          is_my_day?: boolean;
          my_day_date?: string | null;
          notes?: string | null;
          reminder?: string | null;
          repeat_id?: number | null;
          tag_id?: number | null;
          title?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_repeat_id_fkey";
            columns: ["repeat_id"];
            referencedRelation: "task_repeat";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tasks_tag_id_fkey";
            columns: ["tag_id"];
            referencedRelation: "task_tag";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tasks_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      test_data: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      task_repeat_type: "days" | "weeks" | "months" | "years";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey";
            columns: ["owner"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey";
            columns: ["bucket_id"];
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
