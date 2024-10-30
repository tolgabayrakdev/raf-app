'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, Search, X, Users, UserPlus, Mail, Phone } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from 'next/navigation'

interface Person {
  id: number
  name: string
  email: string
  phone: string
}

export default function UserArchive() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [people, setPeople] = useState<Person[]>([
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      email: 'ahmet.yilmaz@email.com',
      phone: '0532 111 22 33'
    },
    {
      id: 2,
      name: 'Ayşe Demir',
      email: 'ayse.demir@email.com',
      phone: '0533 222 33 44'
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      email: 'mehmet.kaya@email.com',
      phone: '0534 333 44 55'
    },
    {
      id: 4,
      name: 'Zeynep Çelik',
      email: 'zeynep.celik@email.com',
      phone: '0535 444 55 66'
    },
    {
      id: 5,
      name: 'Can Özkan',
      email: 'can.ozkan@email.com',
      phone: '0536 555 66 77'
    }
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [newPerson, setNewPerson] = useState({
    name: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    if (searchTerm) {
      setIsSearchOpen(true)
    }
  }, [searchTerm])

  const handleSearchDialogClose = () => {
    setIsSearchOpen(false)
    setSearchTerm('')
  }

  const handleAddPerson = () => {
    setPeople([...people, { id: Date.now(), ...newPerson }])
    setNewPerson({ name: '', email: '', phone: '' })
    setIsOpen(false)
  }

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.phone.includes(searchTerm)
  )

  // Arama işlemini güncelleyen fonksiyon
  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  // Input'a tıklandığında dialog'u açan fonksiyon
  const handleInputClick = () => {
    setIsSearchOpen(true)
  }

  // Bu yıl eklenen kişileri hesapla
  const currentYear = new Date().getFullYear()
  const addedThisYear = people.filter(person => {
    // Gerçek uygulamada kişinin eklenme tarihini kontrol edeceksiniz
    // Şu an için örnek olarak rastgele bir sayı döndürüyoruz
    return true // Örnek için hepsini bu yıl eklenmiş gibi gösteriyoruz
  }).length

  const handlePersonClick = (personId: number) => {
    router.push(`/main/archive/user-archive/${personId}`)
    setIsSearchOpen(false)
    setSearchTerm('')
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Kişiler Arşivi</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Kişi Ekle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Kişi Ekle</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="İsim"
                value={newPerson.name}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, name: e.target.value })
                }
              />
              <Input
                placeholder="E-posta"
                type="email"
                value={newPerson.email}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, email: e.target.value })
                }
              />
              <Input
                placeholder="Telefon"
                value={newPerson.phone}
                onChange={(e) =>
                  setNewPerson({ ...newPerson, phone: e.target.value })
                }
              />
              <Button onClick={handleAddPerson}>Kaydet</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Toplam Kişi</p>
              <h3 className="text-2xl font-bold">{people.length}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserPlus className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Bu Yıl Eklenen</p>
              <h3 className="text-2xl font-bold">{addedThisYear}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Mail className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">E-posta Kayıtlı</p>
              <h3 className="text-2xl font-bold">
                {people.filter(person => person.email).length}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Phone className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Telefon Kayıtlı</p>
              <h3 className="text-2xl font-bold">
                {people.filter(person => person.phone).length}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Arama alanı */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Kişi ara..."
          className="pl-10"
          onClick={handleInputClick}
          readOnly
        />
      </div>

      {/* Arama Dialog'u */}
      <Dialog open={isSearchOpen} onOpenChange={handleSearchDialogClose}>
        <DialogContent className="max-w-xl">
          <DialogHeader className="space-y-4">
            <div className="flex items-center">
              <DialogTitle>Kişi Ara</DialogTitle>
            </div>
            
            {/* Dialog içindeki arama kutusu */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Kişi ara..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
              />
            </div>

            {searchTerm && (
              <div className="text-sm text-gray-500">
                "{searchTerm}" için {filteredPeople.length} sonuç bulundu
              </div>
            )}
          </DialogHeader>

          <div className="h-[400px] overflow-y-auto">
            {searchTerm ? (
              filteredPeople.length > 0 ? (
                <div className="space-y-2">
                  {filteredPeople.map((person) => (
                    <div
                      key={person.id}
                      className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handlePersonClick(person.id)}
                    >
                      <h3 className="font-semibold text-sm">{person.name}</h3>
                      <div className="mt-1 space-y-0.5">
                        <p className="text-xs text-gray-600 flex items-center">
                          <span className="w-14 text-gray-500">E-posta:</span>
                          {person.email}
                        </p>
                        <p className="text-xs text-gray-600 flex items-center">
                          <span className="w-14 text-gray-500">Telefon:</span>
                          {person.phone}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-sm text-gray-500">
                  Aramanızla eşleşen sonuç bulunamadı
                </div>
              )
            ) : (
              <div className="text-center py-8 text-sm text-gray-500">
                Aramaya başlamak için yukarıdaki kutuya yazın
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
