import './global.scss'

export const metadata = {
    title: 'Почти Ozon',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    )
}
