"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function page() {
  return (
    <div className='container mx-auto p-6 space-y-8'>
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                Card Content
            </CardContent>
            <CardFooter>Card Footer</CardFooter>    
        </Card>
    </div>
  )
}
