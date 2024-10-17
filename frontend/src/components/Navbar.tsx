import React from 'react'
import { Box, VStack, HStack, Text, Icon, Link, Image } from '@chakra-ui/react';
import { FaHome, FaPodcast, FaVideo, FaTags, FaLightbulb, FaShoppingBag, FaHeart, FaTrophy, FaStar, FaBook, FaInfoCircle, FaEnvelope, FaListAlt } from 'react-icons/fa';
import alxLogo from '../images/AlxLogo.jpeg'
import { useUser } from '@clerk/clerk-react'


const NavItem = ({ icon, name, link, active }: any) => (
    <Link
      href={link}
      _hover={{ textDecor: 'none' }}
      className={`group flex items-center space-x-2 p-2 rounded-md transition ${
        active ? 'bg-purple-100' : 'hover:bg-gray-100'
      }`}
    >
      <Icon as={icon} className="text-gray-600 group-hover:text-gray-600" boxSize={5} />
      <Text className={`font-medium ${active ? 'text-gray-600' : 'text-gray-800 group-hover:text-gray-600'}`}>
        {name}
      </Text>
    </Link>
);
  
function NavBar() {
  const { user } = useUser()
  const navItems = [
    { name: 'Home', icon: FaHome, link: '/' },
    { name: 'Questions', icon: FaListAlt, link: '/' },
    { name: 'My questions', icon: FaTrophy, link: `/myQuestion/${ user?.id }` },
    { name: 'Saves', icon: FaShoppingBag, link: '/' },
    { name: 'Tags', icon: FaTags, link: '/tags' },
    { name: 'Users', icon: FaEnvelope, link: '/' },
  ]
  return (
    <Box className="w-64 bg-none h-full" p={4}>
      <VStack align="stretch" spacing={2}>
        {navItems.map((item) => (
          <NavItem
            key={item.name}
            icon={item.icon}
            name={item.name}
            link={item.link}
          />
        ))}
        
      </VStack>
    </Box>
  )
}

export default NavBar