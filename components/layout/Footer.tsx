export default function Footer() {
  return (
    <footer className="mt-auto rounded-t-lg bg-[rgb(44,47,58)] shadow-[0_0_10px_rgba(252,252,252,.4)_inset]">
      <p className="flex items-center justify-center py-6 text-white">
        Copyright © {String(new Date().getFullYear())}
      </p>
    </footer>
  )
}
