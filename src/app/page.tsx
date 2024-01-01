import Link from "next/link"
import LoginPage from "./login/page"
export default function Home() {
  return (
    <main 
    >
      <Link href="/signup"> Create new account</Link>
      < LoginPage />
    </main>
  )
}
