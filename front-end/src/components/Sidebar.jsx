import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiPieChart
} from 'react-icons/fi'

import NavItem from '../components/NavItem'


const Sidebar = ({admin}) => {
    const [navSize, changeNavSize] = useState("large")
    return (
        <Flex
            pos="sticky"
            top = "0"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "230px"}
            flexDir="column"
            justifyContent="space-between"
            transition="width 0.3s ease"
            bgColor= "tertiary"
            
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    color="white"
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                <NavItem navSize={navSize} icon={FiHome} title="Dashboard" to={'/'} />
                <NavItem navSize={navSize} icon={FiCalendar} title="Bookings" to={'/bookings'} />
                <NavItem navSize={navSize} icon={FiUser} title="Rooms" to={'/rooms'} />
                <NavItem navSize={navSize} icon={FiPieChart} title="Analytics" to={'/analytics'}/>
                
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">{admin}</Heading>
                        <Text fontWeight="normal" color="white">Shannon</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Sidebar