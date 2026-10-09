import type { Locale } from '@/lib/seo';

export type TopicKey = 'historia' | 'como-llegar' | 'que-ver-cerca' | 'fotos';

export type TopicSection = { heading: string; body: string };
export type TopicFaq = { q: string; a: string };

export type TopicContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  sections: TopicSection[];
  faq: TopicFaq[];
};

export type TopicEntry = {
  slug: Record<Locale, string>;
  content: Record<Locale, TopicContent>;
};

export const TOPIC_KEYS: TopicKey[] = ['historia', 'como-llegar', 'que-ver-cerca', 'fotos'];

export const TOPICS: Record<TopicKey, TopicEntry> = {
  // ---------------------------------------------------------------- historia
  historia: {
    slug: { es: 'historia', en: 'history', zh: 'history' },
    content: {
      es: {
        metaTitle: 'Plaza de España Santo Domingo historia | Plaza de la Hispanidad',
        metaDescription:
          'Historia de la Plaza de España o Plaza de la Hispanidad en Santo Domingo: origen colonial, Alcázar de Colón, Las Atarazanas Reales y su lugar en la Zona Colonial, Patrimonio Mundial de la UNESCO.',
        h1: 'Historia de la Plaza de España (Plaza de la Hispanidad) en Santo Domingo',
        lead:
          'La plaza que hoy se conoce como Plaza de España —y también como Plaza de la Hispanidad— ocupa el espacio abierto que quedó frente al Alcázar de Colón, en la Zona Colonial de Santo Domingo, República Dominicana. Su historia es la del primer siglo de presencia europea permanente en América.',
        sections: [
          {
            heading: 'Cómo nació este espacio',
            body:
              'Santo Domingo fue trasladada a la orilla occidental del río Ozama en 1502 por el gobernador Nicolás de Ovando. El nuevo trazado reservó la manzana situada sobre la barranca del río para la residencia del gobernador y sus dependencias: el futuro Alcázar de Colón. El terreno abierto que quedó delante, entre el palacio y el complejo de almacenes reales conocido como Las Atarazanas, funcionó desde el principio como plaza de acceso y espacio de representación del poder colonial.',
          },
          {
            heading: 'El Alcázar de Colón, frente a la plaza',
            body:
              'Construido entre 1510 y 1514, el Alcázar fue la residencia de Diego Colón, hijo de Cristóbal Colón y gobernador de la isla, y de su esposa María de Toledo. Es la residencia virreinal más antigua conservada en América y hoy funciona como museo. Su fachada principal mira directamente a la plaza, de ahí que el espacio reciba también el nombre de Plaza de España.',
          },
          {
            heading: 'Las Atarazanas Reales y el comercio del Nuevo Mundo',
            body:
              'En el lado opuesto de la plaza se levanta el conjunto de arcos de Las Atarazanas Reales, levantado en el siglo XVI como aduana, almacén y astillero de la Corona. Durante décadas fue el punto de control de los cargamentos que llegaban y salían de La Española, y uno de los primeros complejos de este tipo en América. Los arcos restaurados acogen hoy terrazas, comercios y salas de exposición.',
          },
          {
            heading: 'De la decadencia al reconocimiento de la UNESCO',
            body:
              'Tras siglos de abandono relativo, el barrio colonial fue objeto de programas de restauración a partir del siglo XX. En 1990 la Ciudad Colonial de Santo Domingo —incluida esta plaza, el Alcázar y Las Atarazanas— quedó inscrita en la Lista del Patrimonio Mundial de la UNESCO. La rehabilitación del entorno devolvió a la plaza su papel de sala de estar ciudadana, con terrazas, música en vivo y actividades culturales al aire libre.',
          },
          {
            heading: 'Por qué tiene dos nombres',
            body:
              'Plaza de España y Plaza de la Hispanidad son dos denominaciones del mismo espacio: la primera alude al vínculo con la antigua presencia española en el entorno del Alcázar; la segunda remite al concepto de Hispanidad. La ficha pública del lugar y las fuentes turísticas oficiales dominicanas emplean ambas formas de manera indistinta, por lo que conviene buscarla con los dos nombres.',
          },
        ],
        faq: [
          {
            q: '¿La Plaza de España y la Plaza de la Hispanidad son lo mismo?',
            a: 'Sí. En Santo Domingo se usan ambos nombres para la misma plaza situada frente al Alcázar de Colón, en la Zona Colonial. Las fuentes turísticas oficiales y la ficha pública del lugar citan las dos denominaciones.',
          },
          {
            q: '¿Cuándo se creó la plaza?',
            a: 'El espacio abierto existe desde la fundación y traslado de la ciudad a la orilla occidental del río Ozama en 1502, y quedó configurado en el siglo XVI junto al Alcázar de Colón (1510–1514) y Las Atarazanas Reales. Su aspecto actual es resultado de las restauraciones del siglo XX.',
          },
          {
            q: '¿La plaza forma parte del Patrimonio Mundial de la UNESCO?',
            a: 'Sí. Está dentro del bien "Ciudad Colonial de Santo Domingo", inscrito en la Lista del Patrimonio Mundial de la UNESCO en 1990.',
          },
          {
            q: '¿Qué edificio histórico preside la plaza?',
            a: 'El Alcázar de Colón, residencia de Diego Colón construida entre 1510 y 1514 y considerada la residencia virreinal más antigua conservada en América. Funciona como museo y requiere entrada propia.',
          },
          {
            q: '¿Se puede visitar la plaza por libre o hace falta guía?',
            a: 'La plaza es un espacio público de acceso libre y se recorre sin problema por cuenta propia. Para el interior del Alcázar de Colón y otros museos hay que comprar entrada; en el entorno se ofrecen también visitas guiadas de la Zona Colonial.',
          },
        ],
      },
      en: {
        metaTitle: 'Plaza de España Santo Domingo history | Plaza de la Hispanidad',
        metaDescription:
          'History of Plaza de España, also called Plaza de la Hispanidad, in Santo Domingo: colonial origins, the Alcázar de Colón, Las Atarazanas Reales and its place in the UNESCO-listed Colonial City.',
        h1: 'History of Plaza de España (Plaza de la Hispanidad) in Santo Domingo',
        lead:
          'The square known today as Plaza de España —and also as Plaza de la Hispanidad— is the open space in front of the Alcázar de Colón in the Colonial Zone of Santo Domingo, Dominican Republic. Its story is the story of the first century of permanent European settlement in the Americas.',
        sections: [
          {
            heading: 'How this space came to be',
            body:
              'Santo Domingo was moved to the western bank of the Ozama River in 1502 by governor Nicolás de Ovando. The new street plan reserved the block above the riverbank for the governor’s residence: the future Alcázar de Colón. The open ground left in front of it, between the palace and the royal warehouse complex known as Las Atarazanas, worked from the start as an approach square and a stage for colonial authority.',
          },
          {
            heading: 'The Alcázar de Colón, facing the square',
            body:
              'Built between 1510 and 1514, the Alcázar was the residence of Diego Columbus, son of Christopher Columbus and governor of the island, and of his wife María de Toledo. It is the oldest surviving viceregal residence in the Americas and today houses a museum. Its main façade looks straight onto the square, which is why the space is also called Plaza de España.',
          },
          {
            heading: 'Las Atarazanas Reales and New World trade',
            body:
              'On the opposite side stands the arcaded complex of Las Atarazanas Reales, built in the 16th century as the Crown’s customs house, warehouse and shipyard. For decades it controlled the cargo moving in and out of Hispaniola and is one of the earliest complexes of its kind in the Americas. The restored arches now host terraces, shops and exhibition rooms.',
          },
          {
            heading: 'From decline to UNESCO recognition',
            body:
              'After a long period of relative neglect, the colonial district was restored during the 20th century. In 1990 the Colonial City of Santo Domingo —including this square, the Alcázar and Las Atarazanas— was inscribed on the UNESCO World Heritage List. The rehabilitation gave the square back its role as an open-air living room, with terraces, live music and cultural events.',
          },
          {
            heading: 'Why it has two names',
            body:
              'Plaza de España and Plaza de la Hispanidad are two names for the same square: the first points to the Spanish presence around the Alcázar, the second to the idea of Hispanidad. Official Dominican tourism sources and the public listing of the place use both interchangeably, so it is worth searching for either name.',
          },
        ],
        faq: [
          {
            q: 'Are Plaza de España and Plaza de la Hispanidad the same place?',
            a: 'Yes. In Santo Domingo both names refer to the same square in front of the Alcázar de Colón, in the Colonial Zone. Official tourism sources and the public listing use both names.',
          },
          {
            q: 'When was the square created?',
            a: 'The open space dates from the founding and relocation of the city to the western bank of the Ozama River in 1502, and took shape in the 16th century next to the Alcázar de Colón (1510–1514) and Las Atarazanas Reales. Its current appearance is the result of 20th-century restoration.',
          },
          {
            q: 'Is the square part of a UNESCO World Heritage site?',
            a: 'Yes. It lies within the "Colonial City of Santo Domingo", inscribed on the UNESCO World Heritage List in 1990.',
          },
          {
            q: 'Which historic building dominates the square?',
            a: 'The Alcázar de Colón, the residence of Diego Columbus built between 1510 and 1514 and the oldest surviving viceregal residence in the Americas. It operates as a museum and has its own admission.',
          },
          {
            q: 'Can I visit the square on my own?',
            a: 'Yes — the square is a public space with free access and is easy to walk on your own. The Alcázar de Colón and other museums require a ticket; guided tours of the Colonial Zone are also offered nearby.',
          },
        ],
      },
      zh: {
        metaTitle: '西班牙广场 Plaza de España 圣多明戈历史由来 | Plaza de la Hispanidad',
        metaDescription:
          '西班牙广场（又称 Plaza de la Hispanidad）位于多米尼加共和国圣多明戈殖民区：殖民时期起源、哥伦布宫、皇家船坞 Las Atarazanas 与联合国教科文组织世界遗产背景。',
        h1: '西班牙广场（Plaza de la Hispanidad）· 圣多明戈的历史由来',
        lead:
          '今天被称为西班牙广场（Plaza de España，又称 Plaza de la Hispanidad）的开阔空间，位于多米尼加共和国圣多明戈殖民区的哥伦布宫（Alcázar de Colón）前方。它的历史，就是欧洲人在美洲建立第一个永久殖民地的第一个世纪。',
        sections: [
          {
            heading: '这个空间如何形成',
            body:
              '1502 年，总督尼古拉斯·德·奥万多（Nicolás de Ovando）把圣多明戈城迁到奥萨马河西岸。新的城市规划把临河高地的街区留作总督府用地，也就是日后的哥伦布宫。宫前与皇家仓库建筑群（Las Atarazanas）之间留出的空地，从一开始就是进入宫殿的广场，也是殖民权力的展示空间。',
          },
          {
            heading: '正对广场的哥伦布宫',
            body:
              '哥伦布宫建于 1510 至 1514 年，是哥伦布之子、伊斯帕尼奥拉岛总督迭戈·哥伦布（Diego Colón）与其妻玛丽亚·德·托莱多（María de Toledo）的居所，也是美洲现存最古老的总督府，现作为博物馆开放。它的正立面正对广场，这也是广场被称为「西班牙广场」的原因。',
          },
          {
            heading: '皇家船坞与美洲贸易',
            body:
              '广场另一侧是建于 16 世纪的皇家船坞（Las Atarazanas Reales）拱廊建筑群，曾作为王室的海关、仓库与造船场。数十年来，进出伊斯帕尼奥拉岛的货物都在此查验，是美洲最早的同类设施之一。修复后的拱廊如今是餐厅、商店与展览空间。',
          },
          {
            heading: '从衰落走向世界遗产',
            body:
              '经历长期的相对衰败后，殖民区在 20 世纪得到系统性修复。1990 年，「圣多明戈殖民城」——包括这座广场、哥伦布宫与皇家船坞——被列入联合国教科文组织世界遗产名录。周边环境整治让广场重新成为城市客厅：露天餐厅、现场音乐与文化活动都在这里发生。',
          },
          {
            heading: '为什么有两个名字',
            body:
              '西班牙广场（Plaza de España）与 Hispanidad 广场（Plaza de la Hispanidad）指的是同一个空间：前者指向哥伦布宫一带的西班牙历史渊源，后者源自「Hispanidad（西班牙语世界）」的概念。多米尼加官方旅游资料与该地点的公开资料两种说法并用，因此搜索时用任一个名称都能找到。',
          },
        ],
        faq: [
          {
            q: '西班牙广场和 Plaza de la Hispanidad 是同一个地方吗？',
            a: '是的。在圣多明戈，这两个名称指的是殖民区哥伦布宫前的同一座广场。官方旅游资料与该地点的公开资料两种说法并用。',
          },
          {
            q: '广场是什么时候形成的？',
            a: '这片开阔地可追溯到 1502 年城市迁至奥萨马河西岸的规划，并在 16 世纪随着哥伦布宫（1510–1514）与皇家船坞的建成而定型。如今的风貌则来自 20 世纪的修复工程。',
          },
          {
            q: '广场属于世界遗产范围吗？',
            a: '属于。它位于 1990 年列入联合国教科文组织世界遗产名录的「圣多明戈殖民城」范围内。',
          },
          {
            q: '广场上最主要的历史建筑是哪一座？',
            a: '哥伦布宫（Alcázar de Colón），1510 至 1514 年间为迭戈·哥伦布建造，是美洲现存最古老的总督府，现作为博物馆开放，需另行购票。',
          },
          {
            q: '可以自行参观广场吗？',
            a: '可以。广场是免费开放的公共空间，自行散步即可。进入哥伦布宫等博物馆需另购门票；附近也有殖民区的导览行程。',
          },
        ],
      },
    },
  },

  // ------------------------------------------------------------- como-llegar
  'como-llegar': {
    slug: { es: 'como-llegar', en: 'how-to-get-here', zh: 'getting-there' },
    content: {
      es: {
        metaTitle: 'Plaza de España Santo Domingo cómo llegar | Zona Colonial',
        metaDescription:
          'Cómo llegar a la Plaza de España o Plaza de la Hispanidad en Santo Domingo: a pie por la Zona Colonial, taxi o Uber, metro, desde el aeropuerto SDQ y dónde estacionar cerca.',
        h1: 'Cómo llegar a la Plaza de España (Plaza de la Hispanidad), Santo Domingo',
        lead:
          'La plaza está en la calle La Atarazana 2, dentro de la Zona Colonial de Santo Domingo, a pocos pasos del Alcázar de Colón. La forma más práctica de llegar es caminar: casi todo lo interesante de la Zona Colonial queda a menos de quince minutos a pie.',
        sections: [
          {
            heading: 'Dirección exacta y punto de referencia',
            body:
              'Dirección: C. La Atarazana 2, Santo Domingo 10212, República Dominicana (código Plus F4G8+RP). El punto de referencia más fácil es la fachada del Alcázar de Colón: la plaza es el espacio abierto que queda justo delante, con los arcos de Las Atarazanas en el lado opuesto.',
          },
          {
            heading: 'A pie por la Zona Colonial',
            body:
              'La Zona Colonial es un distrito peatonal con calles empedradas, así que caminar es la mejor opción. Desde la Catedral Primada de América o el Parque Colón se llega en pocos minutos por la Calle Las Damas; desde la calle peatonal El Conde el paseo también es corto. El terreno es mayormente plano y apto para sillas de ruedas y cochecitos.',
          },
          {
            heading: 'En taxi o vehículo de transporte con conductor',
            body:
              'Un taxi o un servicio de transporte con conductor (Uber y similares) puede dejarle en el borde de la Zona Colonial; el último tramo se hace a pie porque las calles del casco histórico son estrechas y de sentido único. Indique al conductor "Plaza de España" o "frente al Alcázar de Colón" para evitar confusiones con otras plazas del país.',
          },
          {
            heading: 'En metro y transporte público',
            body:
              'La Línea 1 del metro de Santo Domingo pasa por el extremo occidental de la Zona Colonial, junto al Parque Independencia y la Puerta del Conde; desde esas estaciones se camina unos diez o quince minutos hasta la plaza. Las rutas de autobús urbano cambian con frecuencia: para trayectos cortos suele ser más cómodo un taxi o un servicio de transporte con conductor.',
          },
          {
            heading: 'Desde el Aeropuerto Internacional Las Américas (SDQ)',
            body:
              'El aeropuerto principal queda al este de la ciudad, a unos 28 km. En taxi o servicio de transporte con conductor el trayecto suele durar entre 30 y 40 minutos por la Autopista Las Américas, cruzando el puente sobre el río Ozama, aunque en horas punta puede tardar bastante más. Reserve con margen si tiene vuelo de salida el mismo día.',
          },
          {
            heading: 'Si va en coche: dónde estacionar',
            body:
              'El casco histórico no tiene grandes aparcamientos públicos en su interior y las calles son estrechas y de sentido único. Lo habitual es dejar el coche en los estacionamientos de pago situados en el perímetro de la Zona Colonial y entrar caminando. No deje objetos a la vista y confirme el horario del estacionamiento si va a volver de noche.',
          },
          {
            heading: 'Consejos prácticos',
            body:
              'Llegue por la tarde, poco antes del atardecer: hace menos calor y la luz es mejor para las fotos. lleve calzado cómodo para el empedrado y consulte la sección del tiempo de la guía principal antes de salir, porque en Santo Domingo son frecuentes los aguaceros de tarde.',
          },
        ],
        faq: [
          {
            q: '¿Cuál es la dirección exacta de la Plaza de España?',
            a: 'C. La Atarazana 2, Santo Domingo 10212, República Dominicana. El código Plus es F4G8+RP y el punto de referencia más claro es la fachada del Alcázar de Colón.',
          },
          {
            q: '¿Se puede llegar en metro?',
            a: 'Sí. La Línea 1 del metro pasa por el extremo occidental de la Zona Colonial (zona Parque Independencia); desde allí se camina unos 10–15 minutos hasta la plaza.',
          },
          {
            q: '¿Cuánto se tarda desde el aeropuerto SDQ?',
            a: 'Hay unos 28 km. En taxi o servicio de transporte con conductor el trayecto suele durar 30–40 minutos, aunque en horas punta puede ser bastante más largo.',
          },
          {
            q: '¿Se puede aparcar en la Zona Colonial?',
            a: 'Dentro del casco histórico apenas hay aparcamientos y las calles son estrechas y de sentido único. Lo práctico es usar los estacionamientos de pago del perímetro y entrar a pie.',
          },
          {
            q: '¿La plaza es accesible en silla de ruedas?',
            a: 'La plaza en sí es plana y abierta. En los alrededores encontrará calles empedradas y alguna acera irregular, por lo que conviene avanzar con calma.',
          },
          {
            q: '¿Es seguro llegar caminando de noche?',
            a: 'La Zona Colonial es una de las zonas más concurridas de la ciudad y la plaza suele tener gente hasta bien entrada la noche. Aun así, conviene seguir las precauciones habituales de cualquier casco antiguo: calles iluminadas, pertenencias a la vista y volver por vías principales.',
          },
        ],
      },
      en: {
        metaTitle: 'How to get to Plaza de España Santo Domingo | Colonial Zone',
        metaDescription:
          'How to reach Plaza de España / Plaza de la Hispanidad in Santo Domingo: walking the Colonial Zone, taxi or ride-hailing, metro, from SDQ airport and where to park nearby.',
        h1: 'How to get to Plaza de España (Plaza de la Hispanidad), Santo Domingo',
        lead:
          'The square sits at Calle La Atarazana 2, inside the Colonial Zone of Santo Domingo, a few steps from the Alcázar de Colón. Walking is the most practical way to arrive — almost everything worth seeing in the Colonial Zone is within a fifteen-minute walk.',
        sections: [
          {
            heading: 'Exact address and landmark',
            body:
              'Address: C. La Atarazana 2, Santo Domingo 10212, Dominican Republic (Plus Code F4G8+RP). The easiest landmark is the façade of the Alcázar de Colón: the square is the open space directly in front of it, with the arches of Las Atarazanas on the opposite side.',
          },
          {
            heading: 'On foot through the Colonial Zone',
            body:
              'The Colonial Zone is a pedestrian-friendly district of cobbled streets, so walking is the best option. From the Catedral Primada de América or Parque Colón it is a short walk along Calle Las Damas; from the pedestrian street El Conde the walk is also short. The ground is mostly flat and manageable with wheelchairs and strollers.',
          },
          {
            heading: 'By taxi or ride-hailing',
            body:
              'A taxi or ride-hailing service (Uber and similar) can drop you at the edge of the Colonial Zone; the last stretch is on foot because the historic streets are narrow and one-way. Tell the driver "Plaza de España" or "in front of the Alcázar de Colón" to avoid confusion with squares of the same name elsewhere.',
          },
          {
            heading: 'By metro and public transport',
            body:
              'Line 1 of the Santo Domingo metro runs along the western edge of the Colonial Zone, near Parque Independencia and Puerta del Conde; from those stations it is a 10–15 minute walk to the square. City bus routes change often, so for short hops a taxi or ride-hailing service is usually easier.',
          },
          {
            heading: 'From Las Américas International Airport (SDQ)',
            body:
              'The main airport lies east of the city, about 28 km away. By taxi or ride-hailing the drive usually takes 30–40 minutes along Autopista Las Américas, crossing the Ozama River bridge, though it can take considerably longer at rush hour. Leave a wide margin if you have a flight the same day.',
          },
          {
            heading: 'If you drive: where to park',
            body:
              'The historic centre has few large public car parks inside and the streets are narrow one-ways. The usual approach is to leave the car in the paid car parks on the perimeter of the Colonial Zone and walk in. Do not leave belongings in sight and check the car park’s hours if you plan to return late.',
          },
          {
            heading: 'Practical tips',
            body:
              'Arrive in the late afternoon, shortly before sunset: it is cooler and the light is better for photos. Wear comfortable shoes for the cobblestones, and check the weather panel in the main guide before you set off, since afternoon downpours are common in Santo Domingo.',
          },
        ],
        faq: [
          {
            q: 'What is the exact address of Plaza de España?',
            a: 'C. La Atarazana 2, Santo Domingo 10212, Dominican Republic. The Plus Code is F4G8+RP and the clearest landmark is the façade of the Alcázar de Colón.',
          },
          {
            q: 'Can I get there by metro?',
            a: 'Yes. Line 1 of the metro runs along the western edge of the Colonial Zone (Parque Independencia area); from there it is a 10–15 minute walk to the square.',
          },
          {
            q: 'How long from SDQ airport?',
            a: 'It is about 28 km. By taxi or ride-hailing the trip usually takes 30–40 minutes, though it can be considerably longer at rush hour.',
          },
          {
            q: 'Is there parking in the Colonial Zone?',
            a: 'There is very little parking inside the historic centre and the streets are narrow one-ways. The practical option is the paid car parks around the perimeter, then walk in.',
          },
          {
            q: 'Is the square wheelchair accessible?',
            a: 'The square itself is flat and open. Around it you will find cobbled streets and some uneven pavements, so allow extra time.',
          },
          {
            q: 'Is it safe to walk there at night?',
            a: 'The Colonial Zone is one of the busiest areas of the city and the square usually has people well into the evening. Still, take the usual precautions for any old town: lit streets, keep belongings in sight and return via main streets.',
          },
        ],
      },
      zh: {
        metaTitle: '西班牙广场 Plaza de España 圣多明戈交通指南｜如何前往',
        metaDescription:
          '如何前往多米尼加圣多明戈的西班牙广场（Plaza de la Hispanidad）：殖民区步行路线、出租车与网约车、地铁、从 SDQ 机场出发的时间与附近停车建议。',
        h1: '如何前往圣多明戈西班牙广场（Plaza de la Hispanidad）',
        lead:
          '广场位于圣多明戈殖民区的 C. La Atarazana 2，距哥伦布宫仅几步之遥。最实用的抵达方式是步行——殖民区内几乎所有值得看的景点都在十五分钟脚程之内。',
        sections: [
          {
            heading: '精确地址与参照点',
            body:
              '地址：C. La Atarazana 2, Santo Domingo 10212, 多米尼加共和国（Plus Code：F4G8+RP）。最容易辨认的参照物是哥伦布宫的立面：广场就是它正前方的开阔空间，对面是皇家船坞的拱廊。',
          },
          {
            heading: '在殖民区内步行',
            body:
              '殖民区是石板路遍布、适合步行的街区，步行是最佳选择。从美洲第一大教堂（Catedral Primada de América）或哥伦布公园（Parque Colón）沿贵妇街（Calle Las Damas）走几分钟即到；从伯爵街（Calle El Conde）步行街过来也很近。地面大体平坦，轮椅与婴儿车通行没有大问题。',
          },
          {
            heading: '出租车与网约车',
            body:
              '出租车或网约车（Uber 等）可把您送到殖民区边缘，最后一段需要步行，因为老城街道狭窄且多为单行道。上车时请说明「Plaza de España」或「哥伦布宫正前方」，以免与其他同名广场混淆。',
          },
          {
            heading: '地铁与公共交通',
            body:
              '圣多明戈地铁 1 号线经过殖民区西端，靠近独立公园（Parque Independencia）与伯爵门（Puerta del Conde）一带；从这些车站步行约 10–15 分钟可达广场。市区公交线路变动频繁，短途通常搭出租车或网约车更省事。',
          },
          {
            heading: '从美洲国际机场（SDQ）出发',
            body:
              '主要机场位于城市以东约 28 公里。搭出租车或网约车走美洲高速公路、跨越奥萨马河大桥，通常约 30–40 分钟；高峰时段可能明显更久。若当天还有回程航班，请预留充足时间。',
          },
          {
            heading: '自驾：在哪里停车',
            body:
              '老城内部几乎没有大型公共停车场，街道狭窄且多单行。常见做法是把车停在殖民区外围的付费停车场，再步行进入。不要把物品留在车内显眼处；若打算深夜取车，请先确认停车场营业时间。',
          },
          {
            heading: '实用建议',
            body:
              '建议在傍晚日落前抵达：比较凉快，光线也最适合拍照。石板路请穿好走的鞋；出发前务必查看主指南的天气面板，圣多明戈午后阵雨相当常见。',
          },
        ],
        faq: [
          {
            q: '西班牙广场的精确地址是什么？',
            a: 'C. La Atarazana 2, Santo Domingo 10212, 多米尼加共和国；Plus Code 为 F4G8+RP，最明确的参照物是哥伦布宫的立面。',
          },
          {
            q: '可以搭地铁到达吗？',
            a: '可以。地铁 1 号线经过殖民区西端（独立公园一带），从车站步行约 10–15 分钟即可抵达广场。',
          },
          {
            q: '从 SDQ 机场要多久？',
            a: '约 28 公里。搭出租车或网约车通常 30–40 分钟，高峰时段可能明显更久。',
          },
          {
            q: '殖民区可以停车吗？',
            a: '老城内部停车位很少，街道多为狭窄单行道。实际做法是使用外围的付费停车场，再步行进入。',
          },
          {
            q: '广场适合轮椅通行吗？',
            a: '广场本身平坦开阔。周边是石板路与部分不平的人行道，建议放慢速度、预留时间。',
          },
          {
            q: '晚上步行前往安全吗？',
            a: '殖民区是全城最热闹的区域之一，广场入夜后通常仍有人潮。仍建议采取老城区的一般防范措施：走有照明的街道、看管好随身物品、回程走主要道路。',
          },
        ],
      },
    },
  },

  // ----------------------------------------------------------- que-ver-cerca
  'que-ver-cerca': {
    slug: { es: 'que-ver-cerca', en: 'what-to-see-nearby', zh: 'nearby-attractions' },
    content: {
      es: {
        metaTitle: 'Qué ver cerca de la Plaza de España Santo Domingo | Zona Colonial',
        metaDescription:
          'Qué ver cerca de la Plaza de España o Plaza de la Hispanidad: Alcázar de Colón, Las Atarazanas Reales, Museo de las Casas Reales, Catedral Primada de América, Calle Las Damas y Fortaleza Ozama.',
        h1: 'Qué ver cerca de la Plaza de España (Plaza de la Hispanidad), Santo Domingo',
        lead:
          'La plaza está en el centro del casco histórico, de modo que los principales monumentos de la Zona Colonial quedan a pocos minutos a pie. Todo el conjunto forma parte del bien "Ciudad Colonial de Santo Domingo", Patrimonio Mundial de la UNESCO desde 1990.',
        sections: [
          {
            heading: 'En la propia plaza',
            body:
              'El Alcázar de Colón cierra la plaza por el este: residencia de Diego Colón construida entre 1510 y 1514 y museo hoy en día. En el lado opuesto, los arcos de Las Atarazanas Reales —antigua aduana y almacenes reales del siglo XVI— albergan terrazas, comercios y salas de exposición.',
          },
          {
            heading: 'A 5 minutos: Museo de las Casas Reales y Calle Las Damas',
            body:
              'El Museo de las Casas Reales ocupa el antiguo conjunto de las Casas Reales, sede de la administración colonial, y recorre la historia de la isla desde la época taína hasta la colonia. Su entrada está en la Calle Las Damas, la primera calle empedrada documentada de América, que une la plaza con la zona de la Catedral.',
          },
          {
            heading: 'A 5–10 minutos: Catedral Primada de América y Parque Colón',
            body:
              'La Catedral Santa María la Menor, conocida como Catedral Primada de América, es la primera catedral del Nuevo Mundo y conserva elementos de los siglos XVI y XVII. Frente a ella, el Parque Colón es un punto habitual de encuentro y de música en vivo, con terrazas alrededor.',
          },
          {
            heading: 'A 10 minutos: Fortaleza Ozama y el paseo del río',
            body:
              'Hacia el sureste, junto a la desembocadura del Ozama, se levanta la Fortaleza Ozama, la fortaleza militar europea más antigua conservada en América. El paseo que rodea el área ofrece vistas al río y al puerto, y es una de las caminatas más agradables de la zona.',
          },
          {
            heading: 'Calle El Conde y Puerta del Conde',
            body:
              'La calle peatonal El Conde es el eje comercial del casco antiguo y termina en la Puerta del Conde, junto al Parque Independencia y al Panteón Nacional. Es la forma más directa de entrar a la Zona Colonial desde el oeste de la ciudad.',
          },
          {
            heading: 'Dónde comer y descansar',
            body:
              'Alrededor de la plaza y en las calles inmediatas abundan terrazas, cafeterías y restaurantes con cocina caribeña, mariscos y platos de inspiración española. Este sitio es una guía independiente: no recomendamos establecimientos concretos; compare precios y menús sobre el terreno.',
          },
          {
            heading: 'Cómo organizar la visita',
            body:
              'Una mañana da para plaza, Alcázar y Casas Reales; la tarde y el atardecer son el mejor momento para la plaza, la Catedral y las terrazas. Si solo dispone de una o dos horas, céntrese en la plaza, el Alcázar y la Calle Las Damas, que están todos juntos.',
          },
        ],
        faq: [
          {
            q: '¿Qué monumentos están justo en la plaza?',
            a: 'El Alcázar de Colón, en el lado este, y los arcos de Las Atarazanas Reales, en el oeste. Ambos son del siglo XVI y forman parte del conjunto Patrimonio Mundial de la UNESCO.',
          },
          {
            q: '¿Qué se puede ver en una hora?',
            a: 'La plaza, la fachada del Alcázar de Colón y un paseo por la Calle Las Damas hasta el Museo de las Casas Reales. Para entrar a los museos necesitará más tiempo y entrada aparte.',
          },
          {
            q: '¿La Catedral Primada de América está lejos?',
            a: 'No: se llega caminando en pocos minutos desde la plaza por la Calle Las Damas. Es la primera catedral construida en el Nuevo Mundo.',
          },
          {
            q: '¿Se puede visitar todo el casco histórico a pie?',
            a: 'Sí. La Zona Colonial es un distrito peatonal y los monumentos principales quedan a menos de quince minutos a pie entre sí.',
          },
          {
            q: '¿Los museos cercanos son gratuitos?',
            a: 'La plaza es gratuita, pero el Alcázar de Colón y otros museos de la zona cobran entrada. Los precios pueden cambiar: confírmelos en la taquilla o en la fuente oficial antes de ir.',
          },
          {
            q: '¿Hay zonas verdes o miradores cerca?',
            a: 'El paseo junto al río Ozama y la zona de la Fortaleza Ozama ofrecen vistas abiertas al agua; dentro del casco antiguo predominan las plazas peatonales y los patios de los edificios históricos.',
          },
        ],
      },
      en: {
        metaTitle: 'What to see near Plaza de España Santo Domingo | Colonial Zone',
        metaDescription:
          'What to see near Plaza de España / Plaza de la Hispanidad: Alcázar de Colón, Las Atarazanas Reales, Museo de las Casas Reales, Catedral Primada de América, Calle Las Damas and Fortaleza Ozama.',
        h1: 'What to see near Plaza de España (Plaza de la Hispanidad), Santo Domingo',
        lead:
          'The square sits in the middle of the historic centre, so the main monuments of the Colonial Zone are a few minutes away on foot. The whole ensemble forms part of the "Colonial City of Santo Domingo", a UNESCO World Heritage site since 1990.',
        sections: [
          {
            heading: 'On the square itself',
            body:
              'The Alcázar de Colón closes the square on the east: the residence of Diego Columbus built between 1510 and 1514, now a museum. Opposite it, the arches of Las Atarazanas Reales —the 16th-century royal customs house and warehouses— hold terraces, shops and exhibition rooms.',
          },
          {
            heading: 'Within 5 minutes: Museo de las Casas Reales and Calle Las Damas',
            body:
              'The Museo de las Casas Reales occupies the former Casas Reales complex, seat of the colonial administration, and covers the island’s history from the Taíno period through colonial times. Its entrance is on Calle Las Damas, the first documented paved street in the Americas, which links the square with the cathedral area.',
          },
          {
            heading: 'Within 5–10 minutes: Catedral Primada de América and Parque Colón',
            body:
              'The cathedral of Santa María la Menor, known as the Catedral Primada de América, is the first cathedral of the New World and keeps elements from the 16th and 17th centuries. Opposite it, Parque Colón is a popular meeting point with live music and terraces around it.',
          },
          {
            heading: 'Within 10 minutes: Fortaleza Ozama and the riverfront',
            body:
              'To the southeast, by the mouth of the Ozama River, stands Fortaleza Ozama, the oldest surviving European military fortress in the Americas. The walkway around the area looks out over the river and the harbour and is one of the pleasantest short walks in the district.',
          },
          {
            heading: 'Calle El Conde and Puerta del Conde',
            body:
              'The pedestrian street El Conde is the commercial spine of the old town and ends at Puerta del Conde, next to Parque Independencia and the Panteón Nacional. It is the most direct way into the Colonial Zone from the west of the city.',
          },
          {
            heading: 'Where to eat and take a break',
            body:
              'Around the square and in the adjoining streets there is no shortage of terraces, cafés and restaurants serving Caribbean cuisine, seafood and Spanish-inspired dishes. This is an independent guide: we do not recommend specific businesses — compare menus and prices on the spot.',
          },
          {
            heading: 'How to plan the visit',
            body:
              'A morning is enough for the square, the Alcázar and the Casas Reales; late afternoon and sunset are the best time for the square, the cathedral and the terraces. If you only have an hour or two, focus on the square, the Alcázar and Calle Las Damas, all of which are together.',
          },
        ],
        faq: [
          {
            q: 'Which monuments are right on the square?',
            a: 'The Alcázar de Colón on the east side and the arches of Las Atarazanas Reales on the west. Both date from the 16th century and belong to the UNESCO World Heritage ensemble.',
          },
          {
            q: 'What can I see in one hour?',
            a: 'The square, the façade of the Alcázar de Colón and a walk down Calle Las Damas to the Museo de las Casas Reales. Going inside the museums takes longer and requires separate tickets.',
          },
          {
            q: 'Is the Catedral Primada de América far?',
            a: 'No — it is a few minutes’ walk from the square along Calle Las Damas. It is the first cathedral built in the New World.',
          },
          {
            q: 'Can the whole historic centre be visited on foot?',
            a: 'Yes. The Colonial Zone is a pedestrian district and the main monuments are less than fifteen minutes apart on foot.',
          },
          {
            q: 'Are the nearby museums free?',
            a: 'The square is free, but the Alcázar de Colón and other museums in the area charge admission. Prices can change, so check at the ticket office or the official source before going.',
          },
          {
            q: 'Are there green spaces or viewpoints nearby?',
            a: 'The walkway by the Ozama River and the Fortaleza Ozama area offer open views over the water. Inside the old town, pedestrian squares and the courtyards of historic buildings predominate.',
          },
        ],
      },
      zh: {
        metaTitle: '西班牙广场 Plaza de España 圣多明戈周边景点｜殖民区必看',
        metaDescription:
          '西班牙广场（Plaza de la Hispanidad）附近有什么可看：哥伦布宫、皇家船坞、皇家宅邸博物馆、美洲第一大教堂、贵妇街与奥萨马堡。',
        h1: '圣多明戈西班牙广场（Plaza de la Hispanidad）周边景点',
        lead:
          '广场位于老城中心，殖民区的主要古迹都在几分钟脚程之内。整个建筑群属于 1990 年列入联合国教科文组织世界遗产名录的「圣多明戈殖民城」。',
        sections: [
          {
            heading: '广场上就有',
            body:
              '东侧是哥伦布宫——1510 至 1514 年为迭戈·哥伦布建造的居所，今日作为博物馆开放。对面是皇家船坞（Las Atarazanas Reales）拱廊，16 世纪的王室海关与仓库，如今是餐厅、商店与展览空间。',
          },
          {
            heading: '5 分钟内：皇家宅邸博物馆与贵妇街',
            body:
              '皇家宅邸博物馆（Museo de las Casas Reales）位于殖民行政机构旧址，展陈从泰诺人时期到殖民时代的历史。它的入口在贵妇街（Calle Las Damas）上，这条美洲最早有记载的石板路把广场与主教座堂一带连接起来。',
          },
          {
            heading: '5–10 分钟：美洲第一大教堂与哥伦布公园',
            body:
              '圣母小堂主教座堂（Catedral Primada de América）是美洲第一座主教座堂，保留了 16 至 17 世纪的元素。对面的哥伦布公园（Parque Colón）是常见的聚会地点，常有现场音乐，四周环绕露天餐厅。',
          },
          {
            heading: '10 分钟：奥萨马堡与河岸步道',
            body:
              '往东南方向、奥萨马河出海口旁是奥萨马堡（Fortaleza Ozama），美洲现存最古老的欧洲军事要塞。周边步道可眺望河流与港口，是区内最宜人的短程散步路线之一。',
          },
          {
            heading: '伯爵街与伯爵门',
            body:
              '伯爵街（Calle El Conde）是老城的商业轴线，尽头是伯爵门（Puerta del Conde），旁边是独立公园（Parque Independencia）与先贤祠（Panteón Nacional）。这是从城市西部进入殖民区最直接的路线。',
          },
          {
            heading: '在哪里吃饭休息',
            body:
              '广场四周及相邻街上有不少露天餐厅、咖啡馆与餐馆，供应加勒比菜、海鲜与西班牙风味料理。本站为独立指南，不推荐特定商家：请在现场比较菜单与价格。',
          },
          {
            heading: '如何安排行程',
            body:
              '一个上午足够看完广场、哥伦布宫与皇家宅邸博物馆；傍晚与日落则是广场、主教座堂与露天餐厅最好的时段。如果只有一到两小时，就以广场、哥伦布宫与贵妇街为重点，它们彼此紧邻。',
          },
        ],
        faq: [
          {
            q: '广场上有哪些古迹？',
            a: '东侧的哥伦布宫与西侧的皇家船坞拱廊，两者都建于 16 世纪，属于世界遗产建筑群的一部分。',
          },
          {
            q: '一小时能看什么？',
            a: '广场、哥伦布宫立面，再沿贵妇街走到皇家宅邸博物馆。若要进入博物馆内部，需要更多时间并另行购票。',
          },
          {
            q: '美洲第一大教堂远吗？',
            a: '不远，从广场沿贵妇街走几分钟即达。它是美洲建造的第一座主教座堂。',
          },
          {
            q: '整个老城可以步行走完吗？',
            a: '可以。殖民区是步行街区，主要古迹之间都在十五分钟脚程以内。',
          },
          {
            q: '附近的博物馆免费吗？',
            a: '广场免费，但哥伦布宫与区内其他博物馆需要门票。票价可能变动，出发前请向售票处或官方渠道确认。',
          },
          {
            q: '附近有绿地或观景点吗？',
            a: '奥萨马河沿岸步道与奥萨马堡一带有开阔的水景视野；老城内则以步行广场与历史建筑的庭院为主。',
          },
        ],
      },
    },
  },

  // ------------------------------------------------------------------- fotos
  fotos: {
    slug: { es: 'fotos', en: 'photos', zh: 'photos' },
    content: {
      es: {
        metaTitle: 'Fotos de la Plaza de España Santo Domingo | Plaza de la Hispanidad',
        metaDescription:
          'Fotos de la Plaza de España o Plaza de la Hispanidad en Santo Domingo: el Alcázar de Colón, los arcos de Las Atarazanas y los mejores puntos y horarios para fotografiar la Zona Colonial.',
        h1: 'Fotos de la Plaza de España (Plaza de la Hispanidad), Santo Domingo',
        lead:
          'Esta galería reúne imágenes de la plaza y de su entorno inmediato en la Zona Colonial de Santo Domingo: la fachada del Alcázar de Colón, los arcos de Las Atarazanas Reales y el ambiente de terrazas y música en vivo que se vive al atardecer.',
        sections: [
          {
            heading: 'Qué se ve en estas imágenes',
            body:
              'La mayoría de las tomas se hicieron desde el espacio abierto de la plaza, mirando hacia el Alcázar de Colón y hacia los arcos de Las Atarazanas. También hay encuadres de las calles empedradas del entorno, de las terrazas que bordean la plaza y de la iluminación nocturna.',
          },
          {
            heading: 'Mejores puntos para fotografiar',
            body:
              'El centro de la plaza permite encuadrar el Alcázar de Colón de frente; desde las escalinatas junto a Las Atarazanas se obtiene una vista en diagonal de toda la plaza. Las calles laterales ofrecen encuadres más cerrados de los muros de piedra y de las fachadas coloniales.',
          },
          {
            heading: 'Mejor luz y momento del día',
            body:
              'La última hora antes del atardecer da la luz más cálida sobre las fachadas de piedra; después, la iluminación nocturna y las terrazas llenas de gente crean el ambiente más característico. A mediodía la luz es dura y el calor intenso, así que conviene buscar sombra o interiores.',
          },
          {
            heading: 'Sobre la autoría de las imágenes',
            body:
              'Todas las fotografías mostradas en este sitio son de referencia y los derechos de imagen y copyright pertenecen a sus autores originales. Consulte la sección de fuentes de la guía principal para las referencias y los enlaces oficiales.',
          },
        ],
        faq: [
          {
            q: '¿Dónde se pueden hacer las mejores fotos de la plaza?',
            a: 'Desde el centro de la plaza, mirando al Alcázar de Colón, y desde las escalinatas junto a los arcos de Las Atarazanas, que dan una vista en diagonal del conjunto.',
          },
          {
            q: '¿Cuál es la mejor hora para fotografiar la Plaza de España?',
            a: 'La última hora antes del atardecer, cuando la luz tiñe las fachadas de piedra, y después del encendido de la iluminación nocturna. A mediodía la luz es demasiado dura.',
          },
          {
            q: '¿Se puede fotografiar con trípode y dron?',
            a: 'Las normas sobre trípodes, drones y fotografía comercial cambian según la autoridad competente del casco histórico. Consúltelas antes de llevar equipo especial.',
          },
          {
            q: '¿Las fotos de este sitio son de libre uso?',
            a: 'No necesariamente: se muestran como referencia y los derechos pertenecen a sus autores originales. Si va a reutilizarlas, obtenga antes la autorización correspondiente.',
          },
        ],
      },
      en: {
        metaTitle: 'Photos of Plaza de España Santo Domingo | Plaza de la Hispanidad',
        metaDescription:
          'Photos of Plaza de España / Plaza de la Hispanidad in Santo Domingo: the Alcázar de Colón, the arches of Las Atarazanas and the best spots and times to photograph the Colonial Zone.',
        h1: 'Photos of Plaza de España (Plaza de la Hispanidad), Santo Domingo',
        lead:
          'This gallery gathers images of the square and its immediate surroundings in the Colonial Zone of Santo Domingo: the façade of the Alcázar de Colón, the arches of Las Atarazanas Reales and the atmosphere of terraces and live music at sunset.',
        sections: [
          {
            heading: 'What these images show',
            body:
              'Most shots were taken from the open space of the square, looking towards the Alcázar de Colón and towards the arches of Las Atarazanas. There are also frames of the surrounding cobbled streets, of the terraces lining the square and of the night-time lighting.',
          },
          {
            heading: 'Best spots for photos',
            body:
              'The centre of the square lets you frame the Alcázar de Colón straight on; from the steps by Las Atarazanas you get a diagonal view over the whole square. The side streets give tighter frames of the stone walls and colonial façades.',
          },
          {
            heading: 'Best light and time of day',
            body:
              'The last hour before sunset gives the warmest light on the stone façades; afterwards the night lighting and the busy terraces create the most characteristic atmosphere. At midday the light is harsh and the heat intense, so look for shade or indoor spaces.',
          },
          {
            heading: 'About image rights',
            body:
              'All photographs shown on this site are for reference and image and copyright rights belong to their original authors. See the sources section of the main guide for the references and official links.',
          },
        ],
        faq: [
          {
            q: 'Where are the best photo spots on the square?',
            a: 'From the centre of the square looking towards the Alcázar de Colón, and from the steps beside the arches of Las Atarazanas, which give a diagonal view of the whole ensemble.',
          },
          {
            q: 'What is the best time to photograph Plaza de España?',
            a: 'The last hour before sunset, when the light warms the stone façades, and after the night lighting comes on. At midday the light is too harsh.',
          },
          {
            q: 'Can I use a tripod or a drone?',
            a: 'Rules on tripods, drones and commercial photography depend on the authority managing the historic centre. Check them before bringing special equipment.',
          },
          {
            q: 'Are the photos on this site free to use?',
            a: 'Not necessarily: they are shown for reference and the rights belong to their original authors. Ask for permission before reusing them.',
          },
        ],
      },
      zh: {
        metaTitle: '西班牙广场 Plaza de España 圣多明戈实拍照片｜Plaza de la Hispanidad',
        metaDescription:
          '多米尼加圣多明戈西班牙广场（Plaza de la Hispanidad）实拍照片：哥伦布宫、皇家船坞拱廊，以及殖民区最佳拍摄位置与光线时段。',
        h1: '圣多明戈西班牙广场（Plaza de la Hispanidad）实拍照片',
        lead:
          '本图库收录广场及其周边殖民区的实景照片：哥伦布宫立面、皇家船坞拱廊，以及傍晚时分露天餐厅与现场音乐交织的氛围。',
        sections: [
          {
            heading: '这些照片拍了什么',
            body:
              '多数照片是从广场开阔处拍摄，视角朝向哥伦布宫与皇家船坞拱廊。也有周边石板街道、环绕广场的露天座位区，以及夜间灯光画面。',
          },
          {
            heading: '最佳拍摄位置',
            body:
              '广场中央可以把哥伦布宫正面完整入镜；从皇家船坞旁的台阶可斜向俯瞰整座广场。两侧小巷则适合拍摄石墙与殖民时期立面的特写。',
          },
          {
            heading: '最佳光线与时段',
            body:
              '日落前最后一小时，光线最暖，最适合石砌立面；入夜后灯光与热闹的露天座位则是这里最有代表性的画面。正午光线过硬、天气炎热，建议找阴凉处或改拍室内。',
          },
          {
            heading: '关于图片版权',
            body:
              '本站所有照片仅作参考，影像权与著作权归原作者所有。相关参考与官方链接请见主指南的资料来源区块。',
          },
        ],
        faq: [
          {
            q: '广场最好的拍照位置在哪里？',
            a: '广场中央正对哥伦布宫，以及皇家船坞拱廊旁的台阶——后者可以斜向俯瞰整座广场。',
          },
          {
            q: '拍摄西班牙广场的最佳时间？',
            a: '日落前最后一小时，光线让石砌立面呈现暖色；入夜灯光亮起后也很有特色。正午光线过硬，不建议。',
          },
          {
            q: '可以用三脚架或空拍机吗？',
            a: '三脚架、空拍机与商业摄影的规定由老城管理单位订定并可能变动。携带特殊器材前请先确认。',
          },
          {
            q: '本站照片可以自由使用吗？',
            a: '不一定：照片仅作参考，权利归原作者所有。若要转载使用，请先取得授权。',
          },
        ],
      },
    },
  },
};

/** 由语种 + slug 反查 topic key，用于静态生成与元数据 */
export function findTopic(locale: Locale, slug: string): TopicKey | undefined {
  return TOPIC_KEYS.find((key) => TOPICS[key].slug[locale] === slug);
}
