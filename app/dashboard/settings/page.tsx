import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompanySettings } from "@/components/company-settings"
import { SystemSettings } from "@/components/system-settings"
import { UserSettings } from "@/components/user-settings"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">설정</h1>
      <Tabs defaultValue="company" className="space-y-4">
        <TabsList>
          <TabsTrigger value="company">회사 정보</TabsTrigger>
          <TabsTrigger value="system">시스템 설정</TabsTrigger>
          <TabsTrigger value="user">사용자 설정</TabsTrigger>
        </TabsList>
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>회사 정보 설정</CardTitle>
              <CardDescription>회사 정보를 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <CompanySettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>시스템 설정</CardTitle>
              <CardDescription>시스템 설정을 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <SystemSettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>사용자 설정</CardTitle>
              <CardDescription>사용자 설정을 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <UserSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

