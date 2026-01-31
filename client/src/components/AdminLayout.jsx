import '../styles/adminContent.css'

export default function AdminLayout({children}) {
  return (
    <div className='wraperAdmin'>
        {children}
    </div>
  )
}
