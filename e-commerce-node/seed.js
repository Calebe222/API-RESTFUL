require('dotenv').config();
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function popularBanco() {
  console.log('Limpando e expandindo o banco de dados...');
  await prisma.produto.deleteMany();

  const produtosGamer = [
    // PERIFÉRICOS
    { 
      nome: "Teclado Mecânico RGB Switch Red", 
      preco: 299.90, 
      estoque: 18, 
      categoria: "Periféricos",
      imagem: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
      descricao: "Switches Red lineares e silenciosos, iluminação RGB por tecla, estrutura em alumínio e cabo USB-C removível."
    },
    { 
      nome: "Mouse Gamer Pro 26000 DPI Ultra Light", 
      preco: 219.90, 
      estoque: 25, 
      categoria: "Periféricos",
      imagem: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
      descricao: "Peso ultraleve de 59g, sensor PixArt 3395 de 26.000 DPI e skates em 100% PTFE puro."
    },
    { 
      nome: "Headset Pro Wireless 7.1 Surround", 
      preco: 449.90, 
      estoque: 14, 
      categoria: "Periféricos",
      imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      descricao: "Conexão sem fio 2.4GHz de baixa latência, drivers de 50mm e bateria de até 30 horas de duração."
    },
    { 
      nome: "Mousepad Speed XXL RGB 90x40cm", 
      preco: 119.90, 
      estoque: 40, 
      categoria: "Periféricos",
      imagem: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
      descricao: "Tecido micro-texturizado de alta precisão, bordas iluminadas em RGB e base em borracha antiderrapante."
    },
    { 
      nome: "Webcam Streamer 4K Ultra HD", 
      preco: 499.90, 
      estoque: 10, 
      categoria: "Periféricos",
      imagem: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=800&q=80",
      descricao: "Resolução 4K a 60FPS com autofoco por Inteligência Artificial e microfones estéreo duplo."
    },
    { 
      nome: "Controle Pro Bluetooth para PC/Console", 
      preco: 349.90, 
      estoque: 20, 
      categoria: "Periféricos",
      imagem: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80",
      descricao: "Analógicos magnéticos Hall Effect anti-drift, 4 paddles traseiros remapeáveis e bateria para 20 horas."
    },
    { 
      nome: "Microfone Condensador USB Studio", 
      preco: 329.90, 
      estoque: 15, 
      categoria: "Periféricos",
      imagem: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
      descricao: "Captação cardioide profissional, botão Mute sensível ao toque e suporte antichoque (Shock Mount) incluso."
    },

    // MONITORES
    { 
      nome: "Monitor Curved 165Hz 1ms 27' QHD", 
      preco: 1599.00, 
      estoque: 12, 
      categoria: "Monitores",
      imagem: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
      descricao: "Curvatura 1500R, resolução QHD (2560x1440), painel VA de 165Hz, 1ms e suporte a HDR10."
    },
    { 
      nome: "Monitor Ultrawide 240Hz 0.5ms 34'", 
      preco: 2899.00, 
      estoque: 5, 
      categoria: "Monitores",
      imagem: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      descricao: "Display IPS Ultrawide 21:9, taxa de atualização extrema de 240Hz, FreeSync Premium e iluminação traseira."
    },

    // HARDWARE
    { 
      nome: "Gabinete Aquário Vidro Temperado", 
      preco: 629.90, 
      estoque: 8, 
      categoria: "Hardware",
      imagem: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
      descricao: "Design panorâmico sem coluna frontal, suporte para até 10 fans ARGB e radiadores de até 360mm."
    },
    { 
      nome: "Water Cooler 360mm ARGB High Chill", 
      preco: 589.90, 
      estoque: 11, 
      categoria: "Hardware",
      imagem: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=80",
      descricao: "Bomba com visor digital de temperatura, 3 fans ARGB PWM de alto fluxo de ar e tubos trançados de nylon."
    },
    { 
      nome: "Fonte 850W 80 Plus Gold Modular", 
      preco: 699.90, 
      estoque: 16, 
      categoria: "Hardware",
      imagem: "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?auto=format&fit=crop&w=800&q=80",
      descricao: "Certificação 80 Plus Gold, cabeamento 100% modular, capacitores japoneses e suporte a conectores PCIe 5.0."
    },
    { 
      nome: "Kit 3 Fans ARGB 120mm com Controladora", 
      preco: 179.90, 
      estoque: 30, 
      categoria: "Hardware",
      imagem: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
      descricao: "Fluxo de ar otimizado de 62 CFM, rolamento hidráulico silencioso e sincronização com placa-mãe."
    },

    // CADEIRAS GAMER
    { 
      nome: "Cadeira Gamer Reclinável 180° Couro PU", 
      preco: 1299.90, 
      estoque: 6, 
      categoria: "Cadeiras",
      imagem: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=800&q=80",
      descricao: "Reclinação total de 180°, almofadas magnéticas com gel de resfriamento, braços 4D e suporte até 150kg."
    },
    { 
      nome: "Cadeira Ergonômica Mesh Breathable Pro", 
      preco: 1099.90, 
      estoque: 9, 
      categoria: "Cadeiras",
      imagem: "https://images.unsplash.com/photo-1580481072645-022f9a6d1270?auto=format&fit=crop&w=800&q=80",
      descricao: "Tecido Mesh de alta respirabilidade, suporte lombar dinâmico ajustável e encosto de cabeça 3D."
    },

    // ACESSÓRIOS
    { 
      nome: "Suporte Articulado a Gás para 2 Monitores", 
      preco: 289.90, 
      estoque: 14, 
      categoria: "Periféricos",
      imagem: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80",
      descricao: "Pistão a gás para ajuste leve, padrão VESA 75/100, organiza cabos e suporta monitores de até 32 polegadas."
    },
    { 
      nome: "Fita de LED Smart RGB Wi-Fi 5 Metros", 
      preco: 89.90, 
      estoque: 45, 
      categoria: "Periféricos",
      imagem: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      descricao: "Controle por aplicativo e comando de voz, sincronização com música e 16 milhões de cores."
    },
    { 
      nome: "Suporte para Headset RGB com Hub USB 3.0", 
      preco: 139.90, 
      estoque: 22, 
      categoria: "Periféricos",
      imagem: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
      descricao: "Base em alumínio antiderrapante, 2 portas USB 3.0 adicionais e iluminação RGB com 8 modos de cor."
    }
  ];

  for (const item of produtosGamer) {
    await prisma.produto.create({ data: item });
  }

  console.log('🔥 Banco de dados expandido com 18 produtos com sucesso!');
  process.exit();
}

popularBanco();