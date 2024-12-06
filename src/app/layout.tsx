import './global.scss'
import {StoreProvider} from "@/store";

export const metadata = {
    title: 'Ozon',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <StoreProvider>
        <body>
            {children}
        </body>
        </StoreProvider>
        </html>
    )
}
