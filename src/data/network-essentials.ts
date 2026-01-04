import type { Question } from '@/types/quiz'

export const networkEssentialsQuestions: Question[] = [
  {
    id: 'ne-1',
    category: '📡 Camadas de Rede e Modelo OSI',
    question: 'Q1: Por que o modelo de camadas é tão importante para desenvolvedores de aplicações?',
    answer: `<p>O modelo de camadas funciona como uma <strong>abstração</strong> que simplifica drasticamente nosso trabalho. Cada camada esconde a complexidade das camadas inferiores, permitindo que:</p>
<ul>
<li>Você não precise saber quais voltagens representam 1 ou 0 no cabo de rede</li>
<li>Possa usar apenas a camada imediatamente abaixo (como usar <code>open()</code> sem instruir o disco manualmente)</li>
<li>Foque apenas no que é relevante para sua aplicação</li>
</ul>
<p>É como usar uma API de alto nível: você chama <code>fetch()</code> e não precisa implementar TCP handshakes manualmente.</p>`
  },
  {
    id: 'ne-2',
    category: '📡 Camadas de Rede e Modelo OSI',
    question: 'Q2: Quais são as 3 camadas mais importantes para System Design Interviews?',
    answer: `<table>
<thead><tr><th>Camada</th><th>Protocolo</th><th>Responsabilidade</th></tr></thead>
<tbody>
<tr><td><strong>Layer 3 (Network)</strong></td><td>IP</td><td>Roteamento, endereçamento, entrega "best-effort"</td></tr>
<tr><td><strong>Layer 4 (Transport)</strong></td><td>TCP, UDP, QUIC</td><td>Comunicação end-to-end, confiabilidade, ordenação</td></tr>
<tr><td><strong>Layer 7 (Application)</strong></td><td>HTTP, DNS, WebSockets</td><td>Protocolos de aplicação</td></tr>
</tbody>
</table>
<p>Layer 3 garante que pacotes cheguem, Layer 4 adiciona garantias sobre <em>como</em> chegam, Layer 7 define <em>o que</em> é comunicado.</p>`
  },
  {
    id: 'ne-3',
    category: '🔌 TCP vs UDP',
    question: 'Q3: Uma empresa de streaming de jogos está decidindo entre TCP e UDP. Qual você recomendaria?',
    answer: `<p><strong>UDP é a escolha correta</strong> para streaming em tempo real:</p>
<ol>
<li><strong>Latência é crítica</strong> - Milissegundos importam em jogos</li>
<li><strong>Perda de pacotes é aceitável</strong> - Frame perdido < atraso</li>
<li><strong>Sem overhead de handshake</strong></li>
<li><strong>Sem retransmissão</strong> - Não faz sentido retransmitir frame antigo</li>
</ol>
<div class="alert"><div class="alert-title">⚠️ Cuidado</div><p>Para browsers, WebRTC seria necessário (único UDP em browser).</p></div>`
  },
  {
    id: 'ne-4',
    category: '🔌 TCP vs UDP',
    question: "Q4: O que significa TCP ser 'connection-oriented'?",
    answer: `<p>TCP estabelece uma <strong>conexão dedicada</strong> via three-way handshake:</p>
<pre><code>1. SYN     → Cliente solicita conexão
2. SYN-ACK → Servidor aceita
3. ACK     → Cliente confirma</code></pre>
<p><strong>Importa porque:</strong></p>
<ul>
<li><strong>Ordenação garantida</strong></li>
<li><strong>Confiabilidade</strong> (ACK + retransmissão)</li>
<li><strong>Estado mantido</strong> durante sessão</li>
<li><strong>Controle de fluxo</strong></li>
</ul>`
  },
  {
    id: 'ne-5',
    category: '🔌 TCP vs UDP',
    question: 'Q5: Quais as principais diferenças entre TCP e UDP?',
    answer: `<table>
<thead><tr><th>Feature</th><th>UDP</th><th>TCP</th></tr></thead>
<tbody>
<tr><td>Conexão</td><td>Connectionless</td><td>Connection-oriented</td></tr>
<tr><td>Confiabilidade</td><td>Best-effort</td><td>Entrega garantida</td></tr>
<tr><td>Ordenação</td><td>Sem garantia</td><td>Mantém ordem</td></tr>
<tr><td>Header Size</td><td>8 bytes</td><td>20-60 bytes</td></tr>
<tr><td>Use Cases</td><td>Streaming, gaming, VoIP, DNS</td><td>Web, APIs, etc.</td></tr>
</tbody>
</table>`
  },
  {
    id: 'ne-6',
    category: '🌐 Protocolos de Aplicação',
    question: "Q6: Por que HTTP é 'stateless' e por que isso é bom?",
    answer: `<p><strong>Stateless</strong>: Cada requisição é independente.</p>
<p><strong>Benefícios:</strong></p>
<ol>
<li><strong>Escalabilidade horizontal</strong> - Qualquer servidor responde</li>
<li><strong>Simplicidade</strong> - Servidores como funções puras <code>f(request) → response</code></li>
<li><strong>Resiliência</strong> - Servidor cai, outro assume</li>
<li><strong>Load balancing facilitado</strong> - Round-robin funciona</li>
</ol>
<p><strong>Princípio</strong>: Minimize estado no sistema. Menos estado = mais fácil escalar.</p>`
  },
  {
    id: 'ne-7',
    category: '🌐 Protocolos de Aplicação',
    question: 'Q7: API mobile precisa mostrar perfil, posts e amigos em uma tela. REST, GraphQL ou gRPC?',
    answer: `<p><strong>GraphQL é a melhor escolha.</strong></p>
<p><strong>Problema com REST:</strong></p>
<ul>
<li><strong>Under-fetching</strong>: 3+ requests necessários</li>
<li><strong>Over-fetching</strong>: Campos desnecessários</li>
<li><strong>Latência</strong>: Múltiplos round-trips = UX ruim</li>
</ul>
<p><strong>GraphQL:</strong></p>
<pre><code>query {
  user(id: "123") {
    name, avatar
    posts(limit: 5) { title }
    friends(limit: 10) { name }
  }
}</code></pre>
<p>Uma request, exatamente os dados necessários, menor payload.</p>`
  },
  {
    id: 'ne-8',
    category: '🌐 Protocolos de Aplicação',
    question: 'Q8: Por que gRPC não é recomendado para APIs públicas?',
    answer: `<p><strong>APIs internas (✅ gRPC):</strong></p>
<ul>
<li>Protocol Buffers ~10x mais eficientes</li>
<li>Tipagem forte (erros em compile-time)</li>
<li>Streaming bidirecional nativo</li>
<li>Você controla ambos os lados</li>
</ul>
<p><strong>APIs externas (❌ Evitar):</strong></p>
<ul>
<li>Protocolo binário - difícil debugar</li>
<li>Browsers não suportam diretamente</li>
<li>REST + OpenAPI mais acessível</li>
</ul>
<pre><code>[Externos] --REST--> [API Gateway] --gRPC--> [Microserviços]</code></pre>`
  },
  {
    id: 'ne-9',
    category: '🌐 Protocolos de Aplicação',
    question: 'Q9: Diferença entre SSE e WebSockets? Quando usar cada?',
    answer: `<table>
<thead><tr><th>Aspecto</th><th>SSE</th><th>WebSockets</th></tr></thead>
<tbody>
<tr><td>Direção</td><td>Unidirecional (server→client)</td><td>Bidirecional</td></tr>
<tr><td>Protocolo</td><td>HTTP</td><td>Protocolo próprio</td></tr>
<tr><td>Reconexão</td><td>Automática</td><td>Manual</td></tr>
<tr><td>Complexidade</td><td>Baixa</td><td>Alta</td></tr>
</tbody>
</table>
<p><strong>SSE</strong>: Notificações, feeds, preços de leilão</p>
<p><strong>WebSockets</strong>: Chat, jogos multiplayer, colaboração</p>
<blockquote>"Launching into WebSocket without justifying is a great way to get thumbs down."</blockquote>`
  },
  {
    id: 'ne-10',
    category: '🌐 Protocolos de Aplicação',
    question: 'Q10: O que é WebRTC e por que é complexo?',
    answer: `<p><strong>WebRTC</strong>: Comunicação <strong>peer-to-peer</strong> entre browsers.</p>
<p><strong>Complexidade:</strong></p>
<p>1. <strong>NAT Traversal</strong>:</p>
<ul>
<li>STUN: "hole punching" para descobrir IP</li>
<li>TURN: Relay como fallback</li>
</ul>
<p>2. <strong>Múltiplas etapas</strong>:</p>
<pre><code>1. Conectar ao signaling server
2. Obter IP via STUN
3. Trocar info
4. Estabelecer P2P
5. (Fallback TURN)</code></pre>
<p><strong>Usar para</strong>: ✅ Video/Audio calls | ❌ Quase todo resto</p>`
  },
  {
    id: 'ne-11',
    category: '⚖️ Load Balancing',
    question: 'Q11: Diferença entre client-side e server-side load balancing?',
    answer: `<p><strong>Client-Side</strong> (ex: Redis Cluster):</p>
<pre><code>1. Cliente pergunta topologia
2. Cliente faz hash → escolhe nó
3. Conecta DIRETAMENTE</code></pre>
<p>✅ Rápido | ❌ Cliente "inteligente"</p>
<p><strong>Dedicated LB</strong> (ex: AWS ALB):</p>
<pre><code>Client → ALB → Backend</code></pre>
<p>✅ Clientes simples, controle granular | ❌ Hop adicional</p>
<p><strong>DNS como LB</strong>: Retorna IPs rotacionados, evita SPOF.</p>`
  },
  {
    id: 'ne-12',
    category: '⚖️ Load Balancing',
    question: 'Q12: WebSockets para chat - L4 ou L7 load balancer?',
    answer: `<p><strong>L4 Load Balancer</strong> é a escolha correta.</p>
<table>
<thead><tr><th>L4</th><th>L7</th></tr></thead>
<tbody>
<tr><td>Opera no TCP/UDP</td><td>Opera no HTTP</td></tr>
<tr><td><strong>Mantém conexão persistente</strong></td><td>Termina e cria nova</td></tr>
<tr><td>Mínima inspeção</td><td>Inspeciona conteúdo</td></tr>
<tr><td>Ideal para stateful</td><td>Ideal para stateless</td></tr>
</tbody>
</table>
<p><strong>Algoritmo</strong>: Least Connections (evita acúmulo)</p>`
  },
  {
    id: 'ne-13',
    category: '⚖️ Load Balancing',
    question: 'Q13: O que são health checks e por que são essenciais?',
    answer: `<p><strong>Health Checks</strong>: Verificam se backends estão saudáveis.</p>
<pre><code>LB --[ping]--> Server
      |
OK → recebe tráfego
Erro → removido (failover)</code></pre>
<p><strong>Tipos</strong>: TCP, HTTP (status code), Custom (dependências)</p>
<p><strong>Essenciais porque</strong>:</p>
<ol>
<li>Failover automático</li>
<li>Detecção proativa</li>
<li>Graceful degradation</li>
</ol>
<p><strong>Config típica</strong>: 5-30s intervalo, 2-3 falhas threshold</p>`
  },
  {
    id: 'ne-14',
    category: '🌍 Regionalização',
    question: 'Q14: A velocidade da luz é uma limitação real?',
    answer: `<p><strong>Sim!</strong></p>
<ul>
<li>Luz em fibra: ~200,000 km/s</li>
<li>NY ↔ Londres: ~5,600 km</li>
<li>Round-trip mínimo: <strong>~56ms</strong></li>
</ul>
<pre><code>Local (<1ms): mesma cidade
Continental (~30ms): outro estado
Intercontinental (~80ms+): outro continente</code></pre>
<p><strong>Soluções</strong>:</p>
<ol>
<li><strong>CDNs</strong>: Cache na edge</li>
<li><strong>Regional Partitioning</strong></li>
<li><strong>Data Locality</strong></li>
</ol>`
  },
  {
    id: 'ne-15',
    category: '🌍 Regionalização',
    question: 'Q15: Como Regional Partitioning resolve latência? (exemplo Uber)',
    answer: `<p><strong>Insight Uber</strong>: "Em Miami, nunca quero motorista de NY."</p>
<pre><code>      [GLOBAL: accounts, payment]
                 |
    ┌────────────┼────────────┐
    ↓            ↓            ↓
[NORTHEAST] [SOUTHEAST] [SOUTHWEST]
 NY drivers  MIA drivers  LA drivers
 Local DB    Local DB     Local DB</code></pre>
<p><strong>Benefícios</strong>:</p>
<ol>
<li>Queries locais</li>
<li>Escala reduzida por região</li>
<li>Latência mínima (server + DB co-localizados)</li>
<li>Isolamento de falhas</li>
</ol>`
  },
  {
    id: 'ne-16',
    category: '🔧 Tratamento de Falhas',
    question: "Q16: O que é 'retry with exponential backoff' e por que jitter é importante?",
    answer: `<p><strong>Exponential Backoff</strong>: Esperar progressivamente mais:</p>
<pre><code>Falhou → espera 1s
Falhou → espera 2s
Falhou → espera 4s...</code></pre>
<p><strong>Sem jitter</strong> (problema):</p>
<pre><code>1000 clientes falham
Todos esperam 1s
1000 retentam juntos ← THUNDERING HERD!</code></pre>
<p><strong>Com jitter</strong>:</p>
<pre><code>Cliente A: 0.8s | B: 1.3s | C: 0.9s
...distribuídos no tempo</code></pre>
<p><strong>Fórmula</strong>: <code>min(cap, base * 2^attempt) + random(0, jitter)</code></p>`
  },
  {
    id: 'ne-17',
    category: '🔧 Tratamento de Falhas',
    question: 'Q17: O que é idempotência e como implementar?',
    answer: `<p><strong>Idempotência</strong>: Operação executada N vezes = mesmo resultado.</p>
<p><strong>Sem idempotência</strong>:</p>
<pre><code>POST /payment $10 → Cobrou
[timeout]
POST /payment $10 → Cobrou DE NOVO! Total: $20</code></pre>
<p><strong>Com Idempotency Key</strong>:</p>
<pre><code>POST /payment
Idempotency-Key: user123-order456
{amount: $10}</code></pre>
<p><strong>Servidor</strong>: Verifica key no cache, retorna resultado anterior se existir.</p>
<p><strong>Naturalmente idempotentes</strong>: GET, PUT, DELETE</p>
<p><strong>Cuidado</strong>: POST, PATCH (incrementos)</p>`
  },
  {
    id: 'ne-18',
    category: '🔧 Tratamento de Falhas',
    question: 'Q18: O que é Circuit Breaker e como previne falhas em cascata?',
    answer: `<p><strong>Circuit Breaker</strong>: Protege quando dependências falham.</p>
<pre><code>       ┌─────────┐
       │ CLOSED  │ ← Normal
       └────┬────┘
    falhas > threshold
            ↓
       ┌─────────┐
       │  OPEN   │ ← Fail fast
       └────┬────┘
    timeout expira
            ↓
       ┌─────────┐
       │HALF-OPEN│ ← Testa 1 request
       └────┬────┘
    sucesso → CLOSED
    falha   → OPEN</code></pre>
<p><strong>Benefícios</strong>: Fail fast, reduz carga, self-healing, isolamento.</p>`
  },
  {
    id: 'ne-19',
    category: '🔧 Tratamento de Falhas',
    question: "Q19: O que é 'thundering herd' e como prevenir?",
    answer: `<p><strong>Thundering Herd</strong>: Muitos clientes atacam recurso recém-disponível.</p>
<pre><code>1. DB cai
2. 10,000 requests esperando
3. DB sobe (1 instância)
4. 10,000 ATACAM
5. Instância cai
6. GOTO 3 (loop de morte)</code></pre>
<p><strong>Circuit Breaker ajuda</strong>:</p>
<pre><code>[10,000 clients] --X BLOCKED
[Apenas 1 teste passa]
[DB sobe com calma]
[Teste OK → tráfego liberado]</code></pre>
<p><strong>Complementos</strong>: Jitter, rate limiting, gradual ramp-up, bulkhead.</p>`
  },
  {
    id: 'ne-20',
    category: '🎯 Cenário Senior',
    question: 'Q20: Como arquitetar notificações em tempo real do Facebook (reações em lives)?',
    answer: `<p><strong>Requisitos</strong>: Milhões simultâneos, fire-and-forget, tempo real.</p>
<pre><code>[VIEWERS: Browser/SSE, App/UDP]
            ↓
    [L7 LOAD BALANCER]
            ↓
  [NOTIFICATION SERVERS]
  - Batching por live_id (100ms)
  - Comprime: "❤️x5000, 😂x2000"
            ↓
     [KAFKA por live_id]
            ↓
   [REACTION INGESTION]</code></pre>
<p><strong>Decisões</strong>:</p>
<ul>
<li>Dual protocol: UDP (apps) + HTTP (browsers)</li>
<li>SSE para push (não WebSocket)</li>
<li>Batching agressivo</li>
<li>Regional partitioning</li>
</ul>`
  },
  {
    id: 'ne-21',
    category: '🎯 Cenário Senior',
    question: 'Q21: O que acontece quando você digita google.com e pressiona Enter?',
    answer: `<pre><code>1. DNS: "Qual IP de google.com?" → 142.250.80.46

2. TCP HANDSHAKE:
   SYN → SYN-ACK → ACK

3. TLS HANDSHAKE:
   Certificados + cipher + chaves

4. HTTP REQUEST:
   GET / HTTP/1.1

5. SERVER PROCESSING ← Única parte que SWEs controlam!

6. HTTP RESPONSE:
   200 OK + HTML

7. RENDERING:
   Parse HTML → CSS/JS/images → render

8. TCP TEARDOWN:
   FIN → ACK → FIN → ACK</code></pre>
<p><strong>Camadas</strong>: L7 (HTTP/DNS/TLS), L4 (TCP), L3 (IP), L2/L1 (físico)</p>`
  }
]
