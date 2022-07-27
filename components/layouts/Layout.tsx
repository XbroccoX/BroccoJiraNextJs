import { FC, PropsWithChildren } from "react";
import Head from 'next/head';
import { Box } from "@mui/material"
import { Navbar, Sidebar } from '../ui';

interface Props {
    title?: string;

}

export const Layout: FC<PropsWithChildren<Props>> = ({ title = 'OpenJiraApp', children }) => {
    return (
        <Box sx={{ flexFlow: 1 }}>
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar />
            <Sidebar />

            <Box sx={{ paddingTop: '10px 20px' }} >
                {children}
            </Box>
        </Box>
    )
}
