export default function Footer() {
  return (
    <footer className=" mt-auto  border border-gray-200 shadow-[0_35px_60px_-15px_rgba(0,0,0,1)]">
      <p className="flex items-center justify-center py-6">
        Copyright © {String(new Date().getFullYear())}
      </p>
    </footer>
  )
}
