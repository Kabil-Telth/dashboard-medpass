// Types mirror the Mongoose models from the Node.js backend.

export type ResourceKey = "institutions" | "applications" | "organisations"

export type InstitutionPartner = {
  _id: string
  institutionIdentity: {
    fullLegalInstitutionName: string
    country: string
    city: string
    institutionType: string
    websiteUrl?: string
    accredited?: boolean
    accreditationBody?: string
  }
  contactPerson: {
    fullName: string
    designation: string
    officialEmail: string
    phoneNumber?: string
    whatsappNumber?: string
  }
  status: string
  notes?: string
  createdAt?: string
  updatedAt?: string
}

export type Organisation = {
  _id: string
  identity: {
    fullLegalName: string
    countryOfRegistration: string
    countriesOfOperation?: string[]
    websiteUrl?: string
    isLicensedAgency: string
  }
  contact: {
    fullName: string
    designation: string
    email: string
    phone?: string
    whatsapp?: string
  }
  status: string
  notes?: string
  createdAt?: string
  updatedAt?: string
}

export type ApplicationRecord = {
  _id: string
  step1?: {
    firstName?: string
    lastName?: string
    middleName?: string
    program?: string
    studentEmail?: string
    parentEmail?: string
    mobilePhone?: string
    gender?: string
    age?: string
    dateOfBirth?: string
    passportNumber?: string
    countryOfCitizenship?: string
    joiningDate?: string
    photoUrl?: string
    currentMailingAddress?: Record<string, string>
  }
  emergencyContacts?: Array<{
    fullName?: string
    phoneNumber?: string
    relation?: string
  }>
  academics?: Record<string, unknown>
  personalStatement?: string
  agentInformation?: {
    name?: string
    contactInformation?: string
    agentNumber?: string
  }
  status: string
  createdAt?: string
  updatedAt?: string
}
