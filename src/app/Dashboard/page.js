'use client'

import CalendarCard from '@/components/dashboard/CalendarCard'
import DashboardCard from '@/components/dashboard/DashboardCard'
import HeaderCompanyInfo from '@/components/dashboard/HeaderCompanyInfo'
import { Box, Flex, GridItem, Heading, Text, Grid } from '@chakra-ui/react'
import { BadgePercentIcon, BanknoteIcon, BarChartIcon, GroupIcon, LineChartIcon, TreePineIcon } from 'lucide-react'

export default function DashboardHomePage() {
  return (
    <Box>
      <HeaderCompanyInfo />

      <Grid templateColumns={{ base: '1fr', md: '250px 1fr' }} gap={6} mt={6} px={6}>
        <GridItem>
          <CalendarCard />
        </GridItem>

        <GridItem>
          <Text fontSize="md" fontWeight="medium" mb={2}>
            APPS
          </Text>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
            <DashboardCard icon={BarChartIcon} label="KPI's" />
            <DashboardCard icon={TreePineIcon} label="Business planning" />
            <DashboardCard icon={LineChartIcon} label="Accounts Payable" />
            <DashboardCard icon={TreePineIcon} label="Accounts Receivable" />
            <DashboardCard icon={GroupIcon} label="Human Resources" />
            <DashboardCard icon={BanknoteIcon} label="E-Invoicing" />
            <DashboardCard icon={BadgePercentIcon} label="Payroll" />
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  )
}