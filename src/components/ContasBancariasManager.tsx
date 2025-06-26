
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus } from "lucide-react";

export function ContasBancariasManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contas Bancárias</h1>
          <p className="text-gray-600 mt-1">Gerenciamento das contas bancárias do condomínio</p>
        </div>
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Nova Conta
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Conta Corrente Principal</CardTitle>
                <CardDescription>Banco do Brasil</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Agência:</span>
                <span className="font-medium">1234-5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Conta:</span>
                <span className="font-medium">67890-1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saldo:</span>
                <span className="font-medium text-green-600">R$ 45.230,50</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Conta Poupança</CardTitle>
                <CardDescription>Caixa Econômica</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Agência:</span>
                <span className="font-medium">9876-5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Conta:</span>
                <span className="font-medium">54321-0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saldo:</span>
                <span className="font-medium text-green-600">R$ 12.580,75</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
