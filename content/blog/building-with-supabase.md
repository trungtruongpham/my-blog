---
title: "Building Modern Apps with Supabase"
description: "A comprehensive guide to using Supabase as your backend-as-a-service"
date: "2024-01-25"
tags: ["supabase", "database", "backend"]
---

# Building Modern Apps with Supabase

Supabase is an open-source Firebase alternative that provides all the backend services you need to build a product. Let's explore how to use Supabase effectively.

## What is Supabase?

Supabase provides:

- **PostgreSQL Database**: Powerful relational database
- **Authentication**: User management and auth flows
- **Storage**: File storage with CDN
- **Real-time**: Subscribe to database changes
- **Edge Functions**: Serverless functions

## Setting Up Supabase

First, install the Supabase client:

```bash
npm install @supabase/supabase-js
```

Create a client instance:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

## Database Operations

### Inserting Data

```typescript
const { data, error } = await supabase
  .from("posts")
  .insert({ title: "Hello World", content: "My first post" })
  .select();
```

### Querying Data

```typescript
const { data, error } = await supabase
  .from("posts")
  .select("*")
  .eq("published", true)
  .order("created_at", { ascending: false });
```

### Updating Data

```typescript
const { data, error } = await supabase
  .from("posts")
  .update({ title: "Updated Title" })
  .eq("id", postId);
```

## Real-time Subscriptions

Subscribe to database changes in real-time:

```typescript
const channel = supabase
  .channel("posts")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "posts" },
    (payload) => {
      console.log("Change received!", payload);
    }
  )
  .subscribe();
```

## Authentication

Supabase makes authentication simple:

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "password123",
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password123",
});

// Sign out
await supabase.auth.signOut();
```

## Best Practices

1. **Use Row Level Security (RLS)**: Always enable RLS on your tables
2. **Environment Variables**: Never expose your service role key
3. **Type Safety**: Generate TypeScript types from your schema
4. **Error Handling**: Always check for errors in responses
5. **Connection Pooling**: Use connection pooling for serverless environments

## Conclusion

Supabase provides a powerful, developer-friendly platform for building modern applications. Its PostgreSQL foundation and extensive features make it an excellent choice for projects of any size.
