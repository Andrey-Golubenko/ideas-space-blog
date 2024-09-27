export default function Footer() {
  return (
    <footer className="mt-auto bg-[#222229]">
      <p className="flex items-center justify-center py-6 text-white">
        Copyright © {String(new Date().getFullYear())}
      </p>
    </footer>
  )
}
