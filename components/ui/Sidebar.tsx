import { Drawer, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useContext } from 'react';
import { UIContext } from '../../context/ui';


const menuItems: String[] = ['Inbox', 'Started', 'Send Email', 'Drafts']

export const Sidebar = () => {

    const { sidemenuOpen, closeSideMenu } = useContext(UIContext)

    return (
        <Drawer
            anchor="left"
            open={sidemenuOpen}
            onClose={closeSideMenu}
        >
            <Box sx={{ width: '250px' }}>

                <Box sx={{ padding: '5px 15px' }}>
                    <Typography variant='h4' >Menu</Typography>
                </Box>

                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItem button key={text} >
                                <ListItemIcon>
                                    {index % 2 ? <InboxIcon /> : <MailOutlineIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }
                </List>

                <Divider />

                <List>
                    {
                        menuItems.map((text, index) => (
                            <ListItem button key={text} >
                                <ListItemIcon>
                                    {index % 2 ? <InboxIcon /> : <MailOutlineIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))
                    }
                </List>

            </Box>

        </Drawer>
    )
}
