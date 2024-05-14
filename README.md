# Next 13

## Server and client components

![React components](/public/example-1.webp)

### Attachment Rules

- you cannot import a server component inside a client component
- you can drop server components into client components as `children`

![Sample page](/public/example-2.avif)

Use client components when:

- it is necessary to use hooks
- when event handlers are needed for user actions
- when using the browser API
- when the class component is used

Use server components when:

- you receive data through the server API
- when you need direct access to backend resources
- when sensitive information is used (API keys, tokens, etc.)
- when heavy dependencies are used