export default function Footer() {
  return (
    <footer className="mt-auto rounded-t-lg bg-[rgb(44,47,58)]">
      <p className="flex items-center justify-center py-6 text-white">
        Copyright © {String(new Date().getFullYear())}
      </p>
    </footer>
  )
}
