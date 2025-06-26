
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Plus, MessageCircle } from "lucide-react";

export function SuperlogicaDashboard() {
  return (
    <div className="space-y-6 relative">
      {/* Banner promocional */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-lg p-6 text-white relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">PODCASTS FOLHA</h2>
            <p className="text-lg">
              Seja caixa no vermelho, seja piscina verde,<br />
              a Superlógica está aqui para <span className="text-yellow-400 font-bold">deixar tudo azul</span>
            </p>
          </div>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6">
            Saiba mais
          </Button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-cyan-400 to-transparent opacity-20 rounded-r-lg"></div>
      </div>

      {/* Seção TODOS OS CONDOMÍNIOS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700 flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            TODOS OS CONDOMÍNIOS
          </h2>
          <span className="text-sm text-gray-500">ÚLTIMA ATUALIZAÇÃO EM 26/06/2025 ÀS 10:21</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card Condomínios ativos */}
          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="text-6xl font-bold text-gray-600 mb-2">2</div>
              <CardTitle className="text-base text-gray-600">Condomínios ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="bg-green-500 hover:bg-green-600 text-white w-full">
                <Plus className="h-4 w-4 mr-2" />
                Novo condomínio
              </Button>
            </CardContent>
          </Card>

          {/* Card Arrecadações */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-600">Arrecadações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-100 rounded-lg p-3 mb-3">
                <div className="h-2 bg-yellow-300 rounded"></div>
              </div>
              <p className="text-sm text-gray-600">
                Nenhum condomínio gerou as arrecadações em junho.
              </p>
              <div className="bg-gray-100 rounded-lg p-3 mt-3">
                <div className="h-2 bg-gray-300 rounded"></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Nenhuma cobrança atrasada este mês.
              </p>
            </CardContent>
          </Card>

          {/* Card Despesas */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-600">Despesas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-3">
                <div className="flex items-center text-sm">
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs mr-2">vencida</span>
                  <span className="text-gray-600">3 despesas no total de R$ 3.820,14 estão</span>
                </div>
                <div className="text-sm text-gray-600 ml-16">vencidas em até 45 dias.</div>
                
                <div className="flex items-center text-sm">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs mr-2">hoje</span>
                  <span className="text-gray-600">Nenhuma despesa vencendo hoje.</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs mr-2">amanhã</span>
                  <span className="text-gray-600">Nenhuma despesa vencendo amanhã.</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs mr-2">semana</span>
                  <span className="text-gray-600">Nenhuma despesa vencendo nos próximos 7 dias.</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <span className="bg-green-700 text-white px-2 py-1 rounded text-xs mr-2">quinzena</span>
                  <span className="text-gray-600">Nenhuma despesa vencendo nos próximos 15 dias.</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card Seguros */}
          <Card className="text-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-600">Seguros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-500 text-white text-2xl font-bold py-2 px-4 rounded mb-2 inline-block">
                2
              </div>
              <p className="text-sm text-gray-600">Seguros não identificados</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Seções adicionais */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base text-gray-700 flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                CONDOMÍNIOS ATIVOS
              </CardTitle>
              <Button variant="ghost" size="sm">
                <span className="text-gray-500">↓</span>
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base text-gray-700 flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                CONDOMÍNIO GESTÃO DE DESPESAS - DEMONSTRATIVO DE R&D (VER MAIS)
              </CardTitle>
              <Button variant="ghost" size="sm">
                <span className="text-gray-500">↓</span>
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Chat flutuante */}
      <div className="fixed bottom-6 right-6">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 p-0 shadow-lg"
          title="Chat de suporte"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
