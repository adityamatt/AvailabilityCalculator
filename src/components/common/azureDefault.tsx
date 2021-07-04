import {
  APIManagement,
  ActiveDirectory,
  ActiveDirectoryBtoC,
  ActiveDirectoryDomain,
  ActiveDirectoryHealthMonitoring,
  AppServiceAPIApps,
  AppServiceMobileApp,
  AzAdvisor,
  AzAnalysisService,
  AzApplicationGateway,
  AzApplicationGatewayColor,
  AzApplicationInsights,
  AzApplicationInsightsColor,
  AzAppService,
  AzAppServiceColor,
  AzAppServiceMobileApp,
  AzAppServiceWebApp,
} from 'azure-react-icons'
import React from 'react'

const size = 20
interface ISingleService {
  key: string
  icon?: JSX.Element
  name: string
  availability: number
}

const azure: ISingleService[] = [
  {
    key: 'ActiveDirectory',
    icon: <ActiveDirectory size={`${size}`} />,
    name: 'Active Directory',
    availability: 99.9,
  },
  {
    key: 'MicrosoftGenome',
    icon: <ActiveDirectory size={`${size}`} />,
    name: 'Microsoft Genome',
    availability: 99.9,
  },
]
export default azure
