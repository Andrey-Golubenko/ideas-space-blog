## Handlers API

To create API-routes inside the `/app` directory, as a rule, a nested directory `/api` is created with its own folders, inside which a file named `route.ts` is created.

If the file is found by the path `/app/api/posts/`, then the request address will be `/api/posts'.

The `route.ts` itself should export an object with functions by the names of HTTP methods: `GET`, `POST`, `DELETE` and so on.

For example:

```typescript
export async function GET(req: Request) {
  return NextResponse.json(currentPosts);
}
```

### Rules for using API handlers and pages

| Page               | Route            | Result      |
| ------------------ | ---------------- | ----------- |
| app/page.js        | app/route.js     | 💥 Conflict |
| app/page.js        | app/api/route.js | 👌 Valid    |
| app/[user]/page.js | app/api/route.js | 👌 Valid    |

### Data extraction

```typescript
// getting query-params

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q");

  // some logic

  return NextResponse.json(currentPosts);
}
```

```typescript
// getting the request body

export async function POST(req: Request) {
  const body = await req.json();

  console.log(body);

  return NextResponse.json({ message: "done" });
}
```

```typescript
// getting URL parameters

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params?.id;

  // some logic for delete post by id

  return NextResponse.json({ id });
}
```

### Built-in functions

```typescript
import { headers, cookies } from "next/headers";

export async function GET(req: Request) {
  const headersList = headers();
  const cookiesList = cookies();

  const type = headersList.get("Content-Type");
  const Cookie_1 = cookiesList.get("Cookie_1")?.value;

  return NextResponse.json({});
}
```

```typescript
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  redirect("https://nextjs.org/");
}
```