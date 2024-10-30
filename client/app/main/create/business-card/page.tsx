"use client"

import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Toggle } from "@/components/ui/toggle"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { 
    Building2,
  Facebook, 
  Globe, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  Twitter, 
} from 'lucide-react'

const InputWithIcon = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }>(
  ({ icon, ...props }, ref) => {
    return (
      <div className="relative">
        <Input ref={ref} {...props} className="pl-8" />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
      </div>
    )
  }
)
InputWithIcon.displayName = 'InputWithIcon'

interface PersonalCardData {
  fullName: string;
  profession: string;
  phone: string;
  email: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  facebook: string;
}

interface CorporateCardData {
  companyName: string;
  businessArea: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

export default function BusinessCardCreator() {
  const [isPersonal, setIsPersonal] = useState(true)
  const [personalData, setPersonalData] = useState<PersonalCardData>({
    fullName: '',
    profession: '',
    phone: '',
    email: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    facebook: ''
  })
  
  const [corporateData, setCorporateData] = useState<CorporateCardData>({
    companyName: '',
    businessArea: '',
    address: '',
    phone: '',
    email: '',
    website: ''
  })

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setPersonalData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleCorporateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setCorporateData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSocialMediaChange = (field: keyof PersonalCardData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Kartvizit Oluştur</h1>
      
      <div className="flex gap-4 mb-6">
        <Toggle 
          pressed={isPersonal} 
          onPressedChange={() => setIsPersonal(true)}
          className=""
        >
          Kişisel
        </Toggle>
        <Toggle 
          pressed={!isPersonal} 
          onPressedChange={() => setIsPersonal(false)}
          className=""
        >
          Kurumsal
        </Toggle>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            {isPersonal ? (
              <form className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Ad Soyad</Label>
                  <Input 
                    id="fullName" 
                    placeholder="Ad Soyad"
                    value={personalData.fullName}
                    onChange={handlePersonalChange}
                  />
                </div>
                <div>
                  <Label htmlFor="profession">Meslek</Label>
                  <Input 
                    id="profession" 
                    placeholder="Meslek"
                    value={personalData.profession}
                    onChange={handlePersonalChange}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input 
                    id="phone" 
                    placeholder="Telefon" 
                    type="tel"
                    value={personalData.phone}
                    onChange={handlePersonalChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-posta</Label>
                  <Input 
                    id="email" 
                    placeholder="E-posta" 
                    type="email"
                    value={personalData.email}
                    onChange={handlePersonalChange}
                  />
                </div>
                <div>
                  <Label>Sosyal Medya</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <InputWithIcon 
                      placeholder="LinkedIn" 
                      icon={<Linkedin className="w-4 h-4" />}
                      value={personalData.linkedin}
                      onChange={handleSocialMediaChange('linkedin')}
                    />
                    <InputWithIcon 
                      placeholder="Twitter" 
                      icon={<Twitter className="w-4 h-4" />}
                      value={personalData.twitter}
                      onChange={handleSocialMediaChange('twitter')}
                    />
                    <InputWithIcon 
                      placeholder="Instagram" 
                      icon={<Instagram className="w-4 h-4" />}
                      value={personalData.instagram}
                      onChange={handleSocialMediaChange('instagram')}
                    />
                    <InputWithIcon 
                      placeholder="Facebook" 
                      icon={<Facebook className="w-4 h-4" />}
                      value={personalData.facebook}
                      onChange={handleSocialMediaChange('facebook')}
                    />
                  </div>
                </div>
              </form>
            ) : (
              <form className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Firma Adı</Label>
                  <Input 
                    id="companyName" 
                    placeholder="Firma Adı"
                    value={corporateData.companyName}
                    onChange={handleCorporateChange}
                  />
                </div>
                <div>
                  <Label htmlFor="businessArea">Çalışma Alanı</Label>
                  <Input 
                    id="businessArea" 
                    placeholder="Çalışma Alanı"
                    value={corporateData.businessArea}
                    onChange={handleCorporateChange}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Adres</Label>
                  <Textarea 
                    id="address" 
                    placeholder="Adres"
                    value={corporateData.address}
                    onChange={handleCorporateChange}
                  />
                </div>
                <div>
                  <Label htmlFor="companyPhone">Telefon</Label>
                  <Input 
                    id="phone" 
                    placeholder="Telefon" 
                    type="tel"
                    value={corporateData.phone}
                    onChange={handleCorporateChange}
                  />
                </div>
                <div>
                  <Label htmlFor="companyEmail">E-posta</Label>
                  <Input 
                    id="email" 
                    placeholder="E-posta" 
                    type="email"
                    value={corporateData.email}
                    onChange={handleCorporateChange}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website" 
                    placeholder="Website"
                    value={corporateData.website}
                    onChange={handleCorporateChange}
                  />
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Önizleme Kartı */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Önizleme</h2>
            <div className="border p-4 rounded-lg">
              {isPersonal ? (
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{personalData.fullName}</h3>
                  <p className="text-muted-foreground">{personalData.profession}</p>
                  {personalData.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{personalData.phone}</span>
                    </div>
                  )}
                  {personalData.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{personalData.email}</span>
                    </div>
                  )}
                  <div className="flex gap-2 mt-2">
                    {personalData.linkedin && <Linkedin className="w-4 h-4" />}
                    {personalData.twitter && <Twitter className="w-4 h-4" />}
                    {personalData.instagram && <Instagram className="w-4 h-4" />}
                    {personalData.facebook && <Facebook className="w-4 h-4" />}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{corporateData.companyName}</h3>
                  <p className="text-muted-foreground">{corporateData.businessArea}</p>
                  {corporateData.address && (
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span>{corporateData.address}</span>
                    </div>
                  )}
                  {corporateData.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{corporateData.phone}</span>
                    </div>
                  )}
                  {corporateData.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{corporateData.email}</span>
                    </div>
                  )}
                  {corporateData.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>{corporateData.website}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Button>Kartviziti Oluştur</Button>
      </div>
    </div>
  )
}
