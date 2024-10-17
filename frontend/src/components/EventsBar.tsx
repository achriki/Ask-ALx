import React from 'react'
import { Box, VStack, Text, Link, HStack } from '@chakra-ui/react';

const Events = [
    { title: "ALX SE: Community Hangout", date: "Oct 25, 2024 2:00 PM", link: 'https://youtube.com/live/AsFLNzHIU6Y?feature=share' },
    { title: 'The SE Face-off Cup begins now! 🔥', date: "Aug 16, 2024 4:00 PM", link: '#' },
    { title: 'Webstack Portfolio Project Checkin', date: "Aug 23, 2024 12:00 PM", link:'https://sandtech.zoom.us/j/83397865507?pwd=wxbjsLwI4Vfstqq9UbI4h1aYe771Fb.1' },
    { title: 'Struggling with your learning? Let’s talk!', date: "Aug 1, 2024 12:00 PM", link: 'https://calendly.com/iaragona/letstalk' },
    { title: '🛠️ Expert Session: Exploring UI/UX design with Edwin Mariwa', date: "Aug 16, 2024 4:00 PM", link: 'https://sandtech.zoom.us/j/84492534931?pwd=4FPi8RyC4FarfCGEYdtyVjzeqNhYQH.1' },
    { title: 'Graduates Unplugged presents - Bring a Graduate!🔥', date: "Jul 19, 2024 4:00 PM", link: 'https://www.youtube.com/live/TQVgsF-X8jc?feature=share' },
]
const EventsItem = ({ title, date, link }:any) => (
    <Link
      href={link}
      _hover={{ textDecor: 'none' }}
      target="_blank"
      className="group flex flex-col justify-between items-start py-2 border-b last:border-b-0 transition"
    >
      <Text className="group-hover:text-gray-600 text-left text-gray-800 font-medium">
        {title}
      </Text>
      <Text className="text-gray-500 text-left text-base" >
        {date}
      </Text>
    </Link>
  );
function EventsBar() {
  return (
    <Box className="w-fulls bg-white shadow-md rounded-lg p-4">
      <Text className="font-bold text-lg mb-4 text-left">Upcoming ALx events</Text>
      <VStack align="stretch" spacing={2}>
        {Events.map((event, index) => (
          <EventsItem
            key={index}
            title={event.title}
            date={event.date}
            link={event.link}
          />
        ))}
      </VStack>
    </Box>
  )
}

export default EventsBar