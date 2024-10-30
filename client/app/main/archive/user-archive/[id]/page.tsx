'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { ArrowLeft, Mail, Phone, User, Calendar } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

interface Person {
    id: number
    name: string
    email: string
    phone: string
}

export default function PersonDetail() {
    const { id } = useParams();
    const router = useRouter()
    const [person, setPerson] = useState<Person | null>(null)

    useEffect(() => {
        // Gerçek uygulamada burada API çağrısı yapılacak
        // Şimdilik örnek veri kullanıyoruz
        const mockPerson: Person = {
            id: parseInt(id),
            name: 'Ahmet Yılmaz',
            email: 'ahmet.yilmaz@email.com',
            phone: '0532 111 22 33'
        }
        setPerson(mockPerson)
    }, [id])

    if (!person) {
        return <div className="p-6">Yükleniyor...</div>
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Geri Dön
                </Button>
            </div>

            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Kişi Detayları
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                <User className="h-12 w-12 text-gray-500" />
                                <div>
                                    <h2 className="text-xl font-semibold">{person.name}</h2>
                                    <p className="text-sm text-gray-500">Kişi ID: {person.id}</p>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <div className="flex items-center gap-3 p-3 border rounded-lg">
                                    <Mail className="h-5 w-5 text-blue-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">E-posta Adresi</p>
                                        <p className="font-medium">{person.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 border rounded-lg">
                                    <Phone className="h-5 w-5 text-green-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Telefon Numarası</p>
                                        <p className="font-medium">{person.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 border rounded-lg">
                                    <Calendar className="h-5 w-5 text-purple-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Kayıt Tarihi</p>
                                        <p className="font-medium">01.01.2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline">Düzenle</Button>
                            <Button variant="destructive">Sil</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
