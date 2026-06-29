// Полная неделя контента на каждый язык.
// День 1 = флагманская тема из LANGS (themed). Здесь — ещё 6 тем на каждый язык,
// у каждой: read (текст по строкам), readAdv (продвинутый слой), words (8), grammar, task.
// Лексика по уровням дополнительно обогащается банками LANG_VOCAB в App.jsx.
// Тон — медленная красивая жизнь (Kinfolk), культура и быт страны языка.
// ВАЖНО: перед запуском желательна вычитка носителем — объём текста большой.

export const LANG_WEEK_EXTRA = {
  "Французский": [
    { theme:"Рынок на рассвете", read:[
      ["Le samedi matin, le marché s'éveille bien avant le reste de la ville.","В субботу утром рынок просыпается задолго до остального города."],
      ["Les marchands installent leurs étals pendant que la lumière est encore douce et grise.","Торговцы расставляют прилавки, пока свет ещё мягкий и серый."],
      ["On entend les voix, le bruit des cagettes et le premier café que l'on verse.","Слышны голоса, стук ящиков и первый разливаемый кофе."],
      ["Les tomates, les pêches et les herbes fraîches sentent l'été et la terre.","Помидоры, персики и свежие травы пахнут летом и землёй."],
      ["Une vieille dame choisit ses légumes lentement, en parlant avec le maraîcher.","Пожилая дама неспешно выбирает овощи, болтая с зеленщиком."],
      ["Ici, on ne se presse pas : acheter est aussi une façon de se rencontrer.","Здесь не спешат: покупать — это ещё и способ встретиться."],
      ["On repart avec un panier lourd, un bouquet de fleurs et le cœur léger.","Уходишь с тяжёлой корзиной, букетом цветов и лёгким сердцем."],
      ["Le marché du matin nous rappelle que la beauté commence par les choses simples.","Утренний рынок напоминает, что красота начинается с простых вещей."],
    ], readAdv:[
      ["Flâner entre les étals, sans liste ni hâte, est un art que la ville moderne a presque oublié.","Бродить между прилавками, без списка и спешки, — искусство, которое современный город почти забыл."],
      ["Pourtant, c'est dans ces gestes anodins que se cache une certaine douceur de vivre.","И всё же именно в этих незначительных жестах кроется особая сладость жизни."],
    ], words:[["le marché","рынок"],["l'étal","прилавок"],["le maraîcher","зеленщик"],["le panier","корзина"],["frais","свежий"],["mûr","спелый"],["flâner","фланировать, гулять"],["la cagette","ящик"]],
      grammar:"Présent — настоящее время. Глаголы на -er: je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent.",
      task:"Опиши на французском свой любимый рынок или магазин в présent (3–4 предложения)." },

    { theme:"Булочная и круассан", read:[
      ["Avant le lever du jour, le boulanger est déjà au travail dans la chaleur du four.","До рассвета пекарь уже за работой, в тепле печи."],
      ["La pâte a reposé toute la nuit ; maintenant elle est douce et vivante sous ses mains.","Тесто отдыхало всю ночь; теперь оно мягкое и живое под его руками."],
      ["Vers sept heures, une odeur de pain chaud se répand dans toute la rue.","К семи часам запах горячего хлеба разносится по всей улице."],
      ["Les gens entrent, encore endormis, et repartent avec une baguette sous le bras.","Люди входят, ещё сонные, и уходят с багетом под мышкой."],
      ["Le croissant, lui, demande du beurre, du temps et beaucoup de patience.","А круассан требует масла, времени и большого терпения."],
      ["On le déguste tiède, avec un café, en regardant la ville s'éveiller.","Его едят тёплым, с кофе, глядя, как просыпается город."],
      ["En France, le pain n'est pas un luxe : c'est un petit bonheur quotidien.","Во Франции хлеб не роскошь: это маленькое ежедневное счастье."],
      ["Prends le temps, demain matin, de savourer vraiment ta première bouchée.","Завтра утром найди время по-настоящему распробовать первый кусочек."],
    ], readAdv:[
      ["Derrière la simplicité d'une baguette se cache un savoir-faire transmis de génération en génération.","За простотой багета скрывается мастерство, передаваемое из поколения в поколение."],
      ["Le boulanger ne vend pas seulement du pain ; il veille, discrètement, sur le rythme du quartier.","Пекарь продаёт не только хлеб; он незаметно хранит ритм квартала."],
    ], words:[["la boulangerie","пекарня"],["la pâte","тесто"],["le four","печь"],["la baguette","багет"],["le beurre","масло"],["tiède","тёплый"],["déguster","смаковать"],["quotidien","ежедневный"]],
      grammar:"Article partitif — частичный артикль для неисчисляемого: du pain, de la confiture, de l'eau. В отрицании → de : pas de pain.",
      task:"Опиши свой идеальный завтрак на французском, используя du / de la / de l' (3–4 предложения)." },

    { theme:"Набережные Сены в сумерках", read:[
      ["Quand le soleil descend, les quais de la Seine deviennent dorés et calmes.","Когда солнце опускается, набережные Сены становятся золотыми и тихими."],
      ["Les bouquinistes ferment leurs petites boîtes vertes pleines de vieux livres.","Букинисты закрывают свои зелёные ящики, полные старых книг."],
      ["Des amoureux s'assoient au bord de l'eau et regardent passer les bateaux.","Влюблённые садятся у воды и смотрят, как проплывают лодки."],
      ["Au loin, Notre-Dame se découpe contre un ciel rose et orange.","Вдали Нотр-Дам вырисовывается на фоне розово-оранжевого неба."],
      ["Quelqu'un joue de l'accordéon ; la musique flotte doucement sur le fleuve.","Кто-то играет на аккордеоне; музыка тихо плывёт над рекой."],
      ["Les lumières de la ville s'allument une à une, comme de petites étoiles.","Огни города зажигаются один за другим, как маленькие звёзды."],
      ["Paris, à cette heure, semble ralentir et respirer plus lentement.","Париж в этот час словно замедляется и дышит медленнее."],
      ["Il suffit parfois d'un coucher de soleil pour se sentir riche.","Иногда достаточно одного заката, чтобы почувствовать себя богатым."],
    ], readAdv:[
      ["Le crépuscule parisien a inspiré peintres et poètes, qui y voyaient l'instant suspendu entre le jour et la nuit.","Парижские сумерки вдохновляли художников и поэтов, видевших в них миг, застывший между днём и ночью."],
      ["Se promener sans but le long de la Seine, c'est s'offrir le plus parisien des luxes : le temps.","Гулять без цели вдоль Сены — значит подарить себе самую парижскую из роскошей: время."],
    ], words:[["le quai","набережная"],["le crépuscule","сумерки"],["le bouquiniste","букинист"],["le fleuve","река"],["le coucher de soleil","закат"],["flotter","плыть, парить"],["s'allumer","зажигаться"],["ralentir","замедляться"]],
      grammar:"Futur proche — ближайшее будущее: aller (au présent) + инфинитив. Je vais marcher, il va pleuvoir, nous allons dîner.",
      task:"Расскажи на французском, что ты собираешься делать сегодня вечером, в futur proche (3 предложения)." },

    { theme:"Лаванда Прованса", read:[
      ["En été, les champs de Provence se couvrent d'un violet infini.","Летом поля Прованса покрываются бесконечным фиолетовым."],
      ["C'est la lavande, qui fleurit sous le soleil chaud du sud de la France.","Это лаванда, что цветёт под жарким солнцем юга Франции."],
      ["Son parfum est partout : dans l'air, dans les maisons, dans le savon.","Её аромат повсюду: в воздухе, в домах, в мыле."],
      ["Les abeilles travaillent du matin au soir et font un miel doux et clair.","Пчёлы трудятся с утра до вечера и делают сладкий светлый мёд."],
      ["Au loin, on aperçoit un village de pierre, calme sous la chaleur.","Вдали виднеется каменная деревня, тихая под зноем."],
      ["Les gens vivent ici au rythme des saisons et de la lumière.","Люди здесь живут в ритме времён года и света."],
      ["Le soir, on dîne dehors, sous les étoiles et le chant des cigales.","Вечером ужинают на улице, под звёздами и пение цикад."],
      ["La Provence apprend une chose : la beauté aime la lenteur.","Прованс учит одному: красота любит медлительность."],
    ], readAdv:[
      ["Cultivée depuis l'Antiquité, la lavande était déjà prisée des Romains pour parfumer leurs bains.","Лаванду выращивают с античности; уже римляне ценили её для ароматизации бань."],
      ["Aujourd'hui, ces champs mauves sont devenus l'image même d'une vie simple et ensoleillée.","Сегодня эти лиловые поля стали самим образом простой и солнечной жизни."],
    ], words:[["la lavande","лаванда"],["le champ","поле"],["le parfum","аромат"],["l'abeille","пчела"],["le miel","мёд"],["la cigale","цикада"],["ensoleillé","солнечный"],["la lenteur","медлительность"]],
      grammar:"Adjectifs — прилагательные согласуются в роде и числе: un village calme, une maison calme, des champs violets. Многие в женском роде → +e.",
      task:"Опиши красивое место на французском, используя 4–5 прилагательных (3 предложения)." },

    { theme:"Искусство сыра", read:[
      ["On dit qu'en France il y a presque un fromage pour chaque jour de l'année.","Говорят, во Франции почти на каждый день года есть свой сыр."],
      ["Chaque région a le sien, avec son goût, son histoire et son caractère.","У каждого региона свой, со своим вкусом, историей и характером."],
      ["Le camembert est doux et crémeux ; le roquefort, fort et puissant.","Камамбер мягкий и сливочный; рокфор — резкий и сильный."],
      ["On choisit le fromage chez un fromager, qui le connaît comme un ami.","Сыр выбирают у сыровара, который знает его, как друга."],
      ["À table, il arrive après le plat et avant le dessert, jamais à la hâte.","За столом он приходит после основного блюда и перед десертом, никогда наспех."],
      ["On le mange avec du bon pain, un peu de vin et beaucoup de conversation.","Его едят с хорошим хлебом, немного вина и множеством разговоров."],
      ["Pour les Français, le fromage n'est pas qu'un aliment : c'est un patrimoine.","Для французов сыр — не просто еда: это наследие."],
      ["Goûter un fromage, c'est goûter tout un paysage et tout un savoir.","Попробовать сыр — значит попробовать целый пейзаж и целое умение."],
    ], readAdv:[
      ["Affiner un fromage demande des mois de soin patient, dans le silence frais des caves.","Выдержка сыра требует месяцев терпеливого ухода, в прохладной тишине погребов."],
      ["Derrière chaque meule se cache la mémoire d'un terroir et le geste d'un artisan.","За каждой головкой сыра скрыта память земли и жест ремесленника."],
    ], words:[["le fromage","сыр"],["le fromager","сыровар"],["crémeux","сливочный"],["le goût","вкус"],["affiner","выдерживать"],["le patrimoine","наследие"],["la cave","погреб"],["savourer","смаковать"]],
      grammar:"Comparatif — сравнение: plus … que (более), moins … que (менее), aussi … que (так же). Le roquefort est plus fort que le camembert.",
      task:"Сравни на французском два блюда или напитка (plus / moins / aussi … que), 3 предложения." },

    { theme:"Кафе и фланёрство", read:[
      ["À Paris, le café n'est pas seulement une boisson : c'est un lieu et un moment.","В Париже кафе — не только напиток: это место и момент."],
      ["On s'installe en terrasse, on commande un café, et on regarde la vie passer.","Садишься на террасе, заказываешь кофе и смотришь, как проходит жизнь."],
      ["Personne ne demande de partir ; on peut rester une heure avec une seule tasse.","Никто не просит уйти; можно сидеть час с одной чашкой."],
      ["C'est ici qu'on lit, qu'on écrit, qu'on rêve et qu'on rencontre des amis.","Именно здесь читают, пишут, мечтают и встречают друзей."],
      ["Flâner, ensuite, dans les rues, sans but précis, fait partie du plaisir.","А потом фланировать по улицам, без определённой цели, — часть удовольствия."],
      ["On s'arrête devant une vitrine, on entre dans une librairie, on respire la ville.","Останавливаешься у витрины, заходишь в книжную лавку, дышишь городом."],
      ["Le flâneur ne perd pas son temps : il l'habite pleinement.","Фланёр не теряет время: он живёт в нём сполна."],
      ["Apprendre à flâner, c'est apprendre à être heureux lentement.","Учиться фланировать — значит учиться быть счастливым медленно."],
    ], readAdv:[
      ["Le flâneur, figure chère à Baudelaire, fait de la rue un salon et de la lenteur une élégance.","Фланёр, образ, дорогой Бодлеру, превращает улицу в салон, а медлительность — в изящество."],
      ["Dans une époque pressée, savoir s'attarder devient presque un acte de résistance douce.","В торопливую эпоху умение задержаться становится почти актом тихого сопротивления."],
    ], words:[["la terrasse","терраса"],["la flânerie","фланёрство"],["flâner","гулять без цели"],["la tasse","чашка"],["la vitrine","витрина"],["s'attarder","задерживаться"],["le plaisir","удовольствие"],["rêver","мечтать"]],
      grammar:"Pronoms compléments — местоимения-дополнения: le, la, les (его/её/их). Je le regarde, je la bois, je les rencontre.",
      task:"Опиши на французском свой идеальный неспешный день, используя le / la / les (3–4 предложения)." },
  ],

  "Английский": [
    { theme:"Английский сад", read:[
      ["The English love their gardens, even the very small ones behind a house.","Англичане любят свои сады, даже совсем маленькие за домом."],
      ["A garden here is not perfect or tidy; it is soft, green and a little wild.","Сад здесь не идеален и не вылизан; он мягкий, зелёный и немного дикий."],
      ["Roses climb the walls, and bees move slowly from flower to flower.","Розы вьются по стенам, и пчёлы медленно перелетают с цветка на цветок."],
      ["There is often a wooden bench, a cup of tea, and the sound of birds.","Часто там есть деревянная скамья, чашка чая и пение птиц."],
      ["People spend hours outside, doing nothing in particular, simply being.","Люди часами сидят на улице, не делая ничего особенного, просто пребывая."],
      ["Even the rain is welcome, for it makes everything greener and fresher.","Даже дождь здесь к месту: от него всё зеленее и свежее."],
      ["A garden teaches patience: nothing beautiful grows in a single day.","Сад учит терпению: ничто прекрасное не вырастает за один день."],
      ["Perhaps that is the secret of happiness — to tend something slowly.","Возможно, в этом и секрет счастья — медленно за чем-то ухаживать."],
    ], readAdv:[
      ["The English garden, seemingly careless, is in truth a carefully composed illusion of nature.","Английский сад, на вид небрежный, на деле — тщательно выстроенная иллюзия природы."],
      ["It celebrates imperfection, reminding us that wildness and grace can quietly coexist.","Он воспевает несовершенство, напоминая, что дикость и изящество могут тихо уживаться."],
    ], words:[["the garden","сад"],["the bench","скамья"],["to bloom","цвести"],["the bee","пчела"],["wild","дикий"],["to tend","ухаживать"],["green","зелёный"],["patience","терпение"]],
      grammar:"Present Continuous — то, что происходит сейчас: am/is/are + глагол-ing. Bees are moving, it is raining, I am reading.",
      task:"Опиши на английском, что происходит в саду или парке прямо сейчас (Present Continuous), 3–4 предложения." },

    { theme:"Дождь и хорошая книга", read:[
      ["In England, the rain is not an enemy; it is an old, familiar friend.","В Англии дождь не враг; он старый, привычный друг."],
      ["On a grey afternoon, the best place to be is a warm armchair by the window.","Серым днём лучшее место — тёплое кресло у окна."],
      ["You make a pot of tea, open a good book, and let the hours disappear.","Завариваешь чайник чая, открываешь хорошую книгу и даёшь часам исчезнуть."],
      ["Outside, the rain taps gently on the glass, like a quiet song.","За окном дождь тихо стучит по стеклу, как негромкая песня."],
      ["There is no need to go anywhere, no need to hurry or to plan.","Никуда не нужно идти, не нужно спешить или что-то планировать."],
      ["A blanket, a candle, and a story are enough to feel completely at home.","Плед, свеча и история — достаточно, чтобы чувствовать себя совсем дома."],
      ["The English even have a word for this cosy feeling: snug.","У англичан есть даже слово для этого уютного чувства: snug."],
      ["A rainy day reminds us that rest, too, is a kind of richness.","Дождливый день напоминает, что отдых — тоже своего рода богатство."],
    ], readAdv:[
      ["There is a peculiar comfort in being indoors while the weather rages outside.","Есть особое утешение в том, чтобы быть в доме, пока за окном бушует непогода."],
      ["The British have turned this melancholy climate into a quiet art of cosiness.","Британцы превратили этот меланхоличный климат в тихое искусство уюта."],
    ], words:[["the rain","дождь"],["the armchair","кресло"],["cosy","уютный"],["the blanket","плед"],["the candle","свеча"],["to tap","стучать"],["gently","мягко"],["to rest","отдыхать"]],
      grammar:"Modal can / could — умение и возможность: I can read all day, you could relax, it can rain.",
      task:"Напиши на английском, что ты любишь делать в дождливый день (use can / could), 3 предложения." },

    { theme:"Море в Корнуолле", read:[
      ["Cornwall lies at the far southwest of England, where the land meets the sea.","Корнуолл лежит на дальнем юго-западе Англии, где земля встречается с морем."],
      ["Its coast is wild: high cliffs, grey rocks and small golden beaches.","Его побережье дикое: высокие утёсы, серые скалы и маленькие золотые пляжи."],
      ["The wind is strong here, and the sea changes colour with the sky.","Ветер здесь сильный, и море меняет цвет вместе с небом."],
      ["Fishing villages sit quietly in the bays, with white houses and blue boats.","Рыбацкие деревушки тихо стоят в бухтах, с белыми домами и синими лодками."],
      ["People walk the coastal path for hours, with the salt wind on their faces.","Люди часами идут по прибрежной тропе, с солёным ветром на лицах."],
      ["In a small café, you eat warm scones and watch the waves roll in.","В маленьком кафе ешь тёплые сконы и смотришь, как накатывают волны."],
      ["Time feels different by the sea; it moves with the tide, not the clock.","У моря время ощущается иначе: оно движется с приливом, а не с часами."],
      ["Cornwall teaches us to breathe deeply and to feel small in a good way.","Корнуолл учит дышать глубоко и чувствовать себя малым — в хорошем смысле."],
    ], readAdv:[
      ["For centuries, this rugged coast lured sailors, painters and dreamers alike.","Веками этот суровый берег манил моряков, художников и мечтателей."],
      ["Its raw, untamed beauty offers a rare antidote to the polished comfort of cities.","Его дикая, неукрощённая красота — редкое противоядие от вылизанного комфорта городов."],
    ], words:[["the seaside","морское побережье"],["the cliff","утёс"],["the wave","волна"],["the tide","прилив"],["the village","деревня"],["salt","соль; солёный"],["wild","дикий"],["to breathe","дышать"]],
      grammar:"Past Simple vs Present Perfect: I walked yesterday (есть время — Past Simple) / I have walked here before (опыт, без времени — Present Perfect).",
      task:"Расскажи на английском о месте у моря, где ты был (Past Simple), 3–4 предложения." },

    { theme:"Шерсть, твид и уют", read:[
      ["When autumn comes, the English reach for wool, tweed and warm scarves.","Когда приходит осень, англичане берутся за шерсть, твид и тёплые шарфы."],
      ["Tweed is a thick, rough cloth, first made in the cold hills of Scotland.","Твид — плотная, грубоватая ткань, впервые сделанная в холодных холмах Шотландии."],
      ["Its colours come from nature: brown earth, grey stone and green moss.","Его цвета — от природы: бурая земля, серый камень и зелёный мох."],
      ["A good tweed jacket can last for thirty years and only grow better.","Хороший твидовый пиджак прослужит тридцать лет и только станет лучше."],
      ["The English value clothes that age well, like good friendships.","Англичане ценят одежду, которая красиво стареет, как хорошая дружба."],
      ["On a cold day, a wool jumper feels like a warm, gentle hug.","В холодный день шерстяной свитер — как тёплое, нежное объятие."],
      ["True style here is not about being new, but about being comfortable and lasting.","Настоящий стиль здесь не в новизне, а в удобстве и долговечности."],
      ["Choose fewer things, but choose them warm, honest and made to last.","Выбирай меньше вещей, но выбирай тёплые, честные и сделанные надолго."],
    ], readAdv:[
      ["In an age of fast fashion, tweed stands as a quiet emblem of permanence.","В эпоху быстрой моды твид — тихий символ постоянства."],
      ["To wear something for decades is, in itself, a gentle rebellion against waste.","Носить вещь десятилетиями — само по себе тихий бунт против расточительства."],
    ], words:[["wool","шерсть"],["tweed","твид"],["the scarf","шарф"],["the jumper","свитер"],["thick","плотный"],["warm","тёплый"],["to last","служить долго"],["comfortable","удобный"]],
      grammar:"Comparatives & superlatives: warm → warmer → the warmest; good → better → the best.",
      task:"Опиши на английском любимую тёплую вещь и сравни её с другой (warmer / better), 3 предложения." },

    { theme:"Тропы и прогулки по полям", read:[
      ["The English countryside is crossed by thousands of small green paths.","Английскую сельскую местность пересекают тысячи маленьких зелёных троп."],
      ["Between the fields grow hedgerows — long, wild lines of bushes and trees.","Между полями растут живые изгороди — длинные дикие полосы кустов и деревьев."],
      ["They are full of birds, berries and tiny flowers all through the year.","Они полны птиц, ягод и крошечных цветов круглый год."],
      ["On a Sunday, families put on boots and walk for miles in the fresh air.","В воскресенье семьи надевают сапоги и идут много миль по свежему воздуху."],
      ["They cross wooden gates, climb gentle hills and rest under old oak trees.","Они проходят деревянные калитки, поднимаются по пологим холмам и отдыхают под старыми дубами."],
      ["There is no destination; the walk itself is the whole point.","Нет пункта назначения; смысл — в самой прогулке."],
      ["Afterwards, a warm pub with a fire feels like a perfect reward.","А потом тёплый паб с камином кажется идеальной наградой."],
      ["A long walk clears the mind better than almost anything else.","Долгая прогулка проясняет ум лучше почти всего остального."],
    ], readAdv:[
      ["These ancient hedgerows, some older than the cathedrals, quietly shelter a whole hidden world of wildlife.","Эти древние изгороди, иные старше соборов, тихо укрывают целый скрытый мир живой природы."],
      ["To walk without a destination is to rediscover the forgotten pleasure of the journey itself.","Идти без цели — значит заново открыть забытое удовольствие самого пути."],
    ], words:[["the countryside","сельская местность"],["the path","тропа"],["the hedgerow","живая изгородь"],["the hill","холм"],["boots","сапоги"],["the oak","дуб"],["to wander","бродить"],["fresh","свежий"]],
      grammar:"Prepositions of place: across, between, under, along. We walk across the fields, along the path, under the trees.",
      task:"Опиши на английском маршрут прогулки, используя предлоги места (3–4 предложения)." },

    { theme:"Воскресный обед", read:[
      ["The Sunday roast is one of the warmest traditions in England.","Воскресный жаркое — одна из самых тёплых традиций Англии."],
      ["The whole family gathers around the table in the early afternoon.","Вся семья собирается за столом в начале дня."],
      ["There is roast meat, golden potatoes, vegetables and rich gravy.","Там запечённое мясо, золотистый картофель, овощи и густая подлива."],
      ["The kitchen smells wonderful for hours before the meal is ready.","Кухня чудесно пахнет несколько часов, прежде чем еда готова."],
      ["People talk, laugh and pass the dishes slowly around the table.","Люди разговаривают, смеются и неспешно передают блюда по столу."],
      ["No one looks at a phone; the meal is the centre of the day.","Никто не смотрит в телефон; трапеза — центр дня."],
      ["After lunch comes a slow walk, and then perhaps a quiet nap.","После обеда — медленная прогулка, а затем, может быть, тихий сон."],
      ["The Sunday roast is less about food than about being together.","Воскресный обед не столько о еде, сколько о том, чтобы быть вместе."],
    ], readAdv:[
      ["This unhurried ritual offers a weekly pause, a deliberate boundary against the rush of the week.","Этот неспешный ритуал дарит еженедельную паузу — намеренную границу от спешки недели."],
      ["Around the table, recipes and stories are passed down as quietly as the gravy.","За столом рецепты и истории передаются так же тихо, как подлива."],
    ], words:[["the roast","жаркое"],["gravy","подлива"],["to gather","собираться"],["the dish","блюдо"],["to pass","передавать"],["together","вместе"],["unhurried","неспешный"],["the nap","короткий сон"]],
      grammar:"Articles a / the: a (один из многих, впервые), the (конкретный, уже известный). A table, the Sunday roast.",
      task:"Опиши на английском семейный обед, используя a и the (3–4 предложения)." },
  ],

  "Итальянский": [
    { theme:"Утренний кофе у стойки", read:[
      ["In Italia, la giornata comincia in piedi, al bancone di un bar.","В Италии день начинается стоя, у барной стойки."],
      ["Il barista prepara l'espresso in pochi secondi, veloce e preciso.","Бариста готовит эспрессо за несколько секунд, быстро и точно."],
      ["Si beve un caffè corto e forte, magari con un cornetto caldo.","Пьют короткий и крепкий кофе, может быть, с тёплым корнетто."],
      ["Nessuno si siede a lungo: il rito del mattino è breve ma sacro.","Никто не сидит подолгу: утренний ритуал короток, но свят."],
      ["Si saluta il barista per nome e si scambiano due parole sul tempo.","Здороваются с бариста по имени и перекидываются парой слов о погоде."],
      ["Il cappuccino, ricordalo, si beve solo la mattina, mai dopo pranzo.","Капучино, запомни, пьют только утром, никогда после обеда."],
      ["Questo piccolo gesto quotidiano unisce tutta l'Italia, da nord a sud.","Этот маленький ежедневный жест объединяет всю Италию, с севера на юг."],
      ["A volte la felicità è semplice come un buon caffè al mattino.","Иногда счастье простое, как хороший кофе по утрам."],
    ], readAdv:[
      ["Il caffè italiano non è una bevanda da asporto, ma un momento condiviso, quasi un'istituzione sociale.","Итальянский кофе — не напиток навынос, а разделённый момент, почти социальный институт."],
      ["In quei pochi minuti al bancone si custodisce, senza accorgersene, il ritmo umano della città.","В эти несколько минут у стойки незаметно хранится человеческий ритм города."],
    ], words:[["il caffè","кофе"],["il bancone","барная стойка"],["il barista","бариста"],["il cornetto","круассан"],["veloce","быстрый"],["il rito","ритуал"],["salutare","здороваться"],["quotidiano","ежедневный"]],
      grammar:"Articoli — артикли: il / lo / la (ед.), i / gli / le (мн.). il caffè, lo zucchero, la tazza; i bar, gli espressi, le tazze.",
      task:"Descrivi la tua mattina in italiano, usando gli articoli giusti (3–4 frasi)." },

    { theme:"Рынок и кухня", read:[
      ["Il mercato italiano è un teatro di colori, voci e profumi.","Итальянский рынок — это театр красок, голосов и ароматов."],
      ["I pomodori sono rossi e maturi, il basilico profuma di estate.","Помидоры красные и спелые, базилик пахнет летом."],
      ["Il fruttivendolo conosce ogni cliente e consiglia cosa è più fresco oggi.","Зеленщик знает каждого покупателя и советует, что сегодня свежее."],
      ["In Italia si cucina con poche cose, ma buone e di stagione.","В Италии готовят из немногого, но хорошего и сезонного."],
      ["Un piatto di pasta semplice può essere più buono di mille cose complicate.","Простая тарелка пасты может быть вкуснее тысячи сложных блюд."],
      ["Si mangia insieme, lentamente, parlando e ridendo a tavola.","Едят вместе, медленно, разговаривая и смеясь за столом."],
      ["La cucina, qui, è un atto d'amore prima ancora che di necessità.","Кухня здесь — акт любви прежде, чем необходимость."],
      ["Cucinare con calma è un modo dolce di prendersi cura degli altri.","Готовить не спеша — нежный способ заботиться о других."],
    ], readAdv:[
      ["Dietro l'apparente semplicità della cucina italiana si nasconde una profonda saggezza contadina.","За кажущейся простотой итальянской кухни скрыта глубокая крестьянская мудрость."],
      ["Scegliere ingredienti di stagione significa vivere in armonia con il tempo e con la terra.","Выбирать сезонные продукты — значит жить в согласии со временем и землёй."],
    ], words:[["il mercato","рынок"],["il pomodoro","помидор"],["il fruttivendolo","зеленщик"],["maturo","спелый"],["la stagione","сезон"],["cucinare","готовить"],["a tavola","за столом"],["la cura","забота"]],
      grammar:"Presente dei verbi -are: io parlo, tu parli, lui parla, noi parliamo, voi parlate, loro parlano.",
      task:"Descrivi un piatto che ami cucinare, al presente (3 frasi)." },

    { theme:"Вечерняя прогулка", read:[
      ["Ogni sera, nelle città italiane, comincia un piccolo rito: la passeggiata.","Каждый вечер в итальянских городах начинается маленький ритуал: прогулка."],
      ["La gente esce di casa, ben vestita, solo per camminare e farsi vedere.","Люди выходят из дома, нарядные, просто чтобы пройтись и показать себя."],
      ["Si cammina piano lungo le strade del centro, senza nessuna fretta.","Идут медленно по улицам центра, безо всякой спешки."],
      ["Ci si ferma a parlare con gli amici, a guardare le vetrine, a prendere un gelato.","Останавливаются поговорить с друзьями, посмотреть витрины, взять мороженое."],
      ["I bambini corrono nella piazza mentre i nonni siedono sulle panchine.","Дети бегают по площади, пока бабушки и дедушки сидят на скамейках."],
      ["Questa passeggiata non ha nessuno scopo utile, eppure è amata da tutti.","Эта прогулка не имеет никакой полезной цели, и всё же её все любят."],
      ["È uno dei momenti più belli e più umani di tutta la giornata.","Это один из самых красивых и человечных моментов всего дня."],
      ["Camminare senza meta, la sera, è un modo gentile di salutare il giorno.","Гулять без цели вечером — нежный способ попрощаться с днём."],
    ], readAdv:[
      ["La passeggiata è un rituale collettivo in cui la città intera si ritrova e si riconosce.","Passeggiata — коллективный ритуал, в котором весь город встречается и узнаёт себя."],
      ["In essa sopravvive un'idea antica: che lo stare insieme valga più di qualsiasi destinazione.","В ней живёт древняя идея: что быть вместе ценнее любого пункта назначения."],
    ], words:[["la passeggiata","прогулка"],["la sera","вечер"],["la piazza","площадь"],["la panchina","скамейка"],["il gelato","мороженое"],["la vetrina","витрина"],["senza meta","без цели"],["piano","медленно"]],
      grammar:"Verbi riflessivi — возвратные: si chiama, ci si ferma, mi vesto. Riflessivo = действие на себя.",
      task:"Descrivi la tua serata ideale in italiano, con un verbo riflessivo (mi rilasso, mi siedo…), 3 frasi." },

    { theme:"Искусство и Флоренция", read:[
      ["Firenze è una città piccola, ma piena di arte e di storia.","Флоренция — маленький город, но полный искусства и истории."],
      ["Qui, cinquecento anni fa, è nato il Rinascimento, una grande rinascita.","Здесь, пятьсот лет назад, родился Ренессанс — великое возрождение."],
      ["Artisti come Leonardo e Michelangelo hanno lavorato in queste strade.","Художники, как Леонардо и Микеланджело, работали на этих улицах."],
      ["Nel museo degli Uffizi si trovano quadri famosi in tutto il mondo.","В музее Уффици находятся картины, знаменитые на весь мир."],
      ["Ma l'arte, a Firenze, non sta solo nei musei: è ovunque, nelle piazze.","Но искусство во Флоренции не только в музеях: оно повсюду, на площадях."],
      ["Si cammina e, all'improvviso, si vede una cupola, una statua, un affresco.","Идёшь — и вдруг видишь купол, статую, фреску."],
      ["Gli abitanti vivono con la bellezza ogni giorno, con calma e naturalezza.","Жители живут с красотой каждый день, спокойно и естественно."],
      ["Firenze insegna che la bellezza non è un lusso, ma un modo di vivere.","Флоренция учит, что красота — не роскошь, а способ жизни."],
    ], readAdv:[
      ["Camminare per Firenze significa attraversare i secoli a ogni angolo di strada.","Гулять по Флоренции — значит пересекать века на каждом углу улицы."],
      ["Il Rinascimento non fu solo arte, ma una nuova fiducia nell'ingegno e nella dignità dell'uomo.","Ренессанс был не только искусством, но и новой верой в ум и достоинство человека."],
    ], words:[["l'arte","искусство"],["il quadro","картина"],["la cupola","купол"],["la statua","статуя"],["il museo","музей"],["la bellezza","красота"],["nascere","рождаться"],["ovunque","повсюду"]],
      grammar:"Passato prossimo: avere / essere + participio. Ho visto, è nato, hanno lavorato. Con essere il participio concorda: è nata.",
      task:"Racconta cosa hai visto in un museo o in un viaggio, al passato prossimo (3 frasi)." },

    { theme:"Море и побережье", read:[
      ["L'Italia è una lunga penisola, circondata quasi ovunque dal mare.","Италия — длинный полуостров, почти всюду окружённый морем."],
      ["In estate, la gente lascia le città calde e va verso la costa.","Летом люди покидают жаркие города и едут к побережью."],
      ["I piccoli paesi sul mare hanno case colorate e barche di pescatori.","Маленькие приморские городки — с цветными домами и лодками рыбаков."],
      ["La mattina presto, i pescatori tornano con il pesce fresco del giorno.","Ранним утром рыбаки возвращаются со свежей рыбой дня."],
      ["A pranzo si mangia pesce semplice, con olio, limone e un po' di sale.","На обед едят простую рыбу, с маслом, лимоном и щепоткой соли."],
      ["Il pomeriggio passa lento, tra il sole, l'ombra e il rumore delle onde.","После полудня время течёт медленно — между солнцем, тенью и шумом волн."],
      ["La sera, il cielo diventa rosa e tutti guardano il tramonto sul mare.","Вечером небо становится розовым, и все смотрят на закат над морем."],
      ["Il mare insegna la pazienza: va e viene, come tutte le cose belle.","Море учит терпению: оно приходит и уходит, как всё прекрасное."],
    ], readAdv:[
      ["Per gli italiani, il mare non è solo un luogo di vacanza, ma una parte profonda dell'identità.","Для итальянцев море — не просто место отдыха, а глубокая часть их идентичности."],
      ["Nel ritmo lento delle onde si nasconde una lezione antica sul valore dell'attesa.","В медленном ритме волн скрыт древний урок о ценности ожидания."],
    ], words:[["il mare","море"],["la costa","побережье"],["il pescatore","рыбак"],["la barca","лодка"],["il pesce","рыба"],["l'onda","волна"],["il tramonto","закат"],["la pazienza","терпение"]],
      grammar:"Plurale dei nomi: -o → -i (libro → libri), -a → -e (barca → barche), -e → -i (mare → mari).",
      task:"Descrivi una giornata al mare in italiano, usando alcuni plurali (3–4 frasi)." },

    { theme:"Семья за столом", read:[
      ["In Italia, la tavola è il cuore della casa e della famiglia.","В Италии стол — сердце дома и семьи."],
      ["La domenica, tutti si riuniscono per il pranzo, che dura ore.","В воскресенье все собираются на обед, который длится часами."],
      ["La nonna cucina dal mattino presto, con amore e con pazienza.","Бабушка готовит с самого утра, с любовью и терпением."],
      ["Arrivano i piatti, uno dopo l'altro, e nessuno ha mai fretta.","Блюда приходят одно за другим, и никто никогда не спешит."],
      ["Si parla, si discute, si ride e a volte si canta tutti insieme.","Говорят, спорят, смеются, а иногда поют все вместе."],
      ["Dopo il pranzo si resta a tavola a lungo, solo per il piacere di parlare.","После обеда долго остаются за столом, просто ради удовольствия беседовать."],
      ["Il cibo nutre il corpo, ma stare insieme nutre il cuore.","Еда питает тело, а быть вместе питает сердце."],
      ["Forse il segreto della felicità italiana è proprio questo: la tavola condivisa.","Возможно, секрет итальянского счастья именно в этом: разделённый стол."],
    ], readAdv:[
      ["Il pranzo della domenica è un'istituzione che resiste, nonostante la fretta dei tempi moderni.","Воскресный обед — институт, который держится, несмотря на спешку современности."],
      ["Attorno a quella tavola si trasmettono ricette, ricordi e l'invisibile filo degli affetti.","За этим столом передаются рецепты, воспоминания и невидимая нить привязанностей."],
    ], words:[["la tavola","стол"],["la famiglia","семья"],["il pranzo","обед"],["la nonna","бабушка"],["riunirsi","собираться"],["ridere","смеяться"],["condividere","делить"],["il cuore","сердце"]],
      grammar:"Verbi impersonali con 'si': si parla, si mangia, si resta. 'Si' = безличное «говорят / едят».",
      task:"Descrivi un pranzo in famiglia in italiano, usando 'si' impersonale (3 frasi)." },
  ],

  "Испанский": [
    { theme:"Завтрак и кофе", read:[
      ["En España, el día empieza despacio, con un buen desayuno sin prisa.","В Испании день начинается медленно, с хорошего завтрака без спешки."],
      ["Mucha gente desayuna fuera, en un bar de la esquina, antes del trabajo.","Многие завтракают вне дома, в баре на углу, перед работой."],
      ["Se toma un café con leche y una tostada con aceite de oliva y tomate.","Берут кофе с молоком и тост с оливковым маслом и помидором."],
      ["El camarero saluda a todos por su nombre, como a viejos amigos.","Официант здоровается со всеми по имени, как со старыми друзьями."],
      ["Se lee el periódico, se charla un poco y no se mira el reloj.","Читают газету, немного болтают и не смотрят на часы."],
      ["Este momento tranquilo da fuerza y buen humor para todo el día.","Этот спокойный момент даёт сил и хорошего настроения на весь день."],
      ["Para los españoles, desayunar bien no es un lujo, sino una costumbre.","Для испанцев хорошо позавтракать — не роскошь, а привычка."],
      ["Empezar el día con calma cambia, poco a poco, toda la vida.","Начинать день спокойно постепенно меняет всю жизнь."],
    ], readAdv:[
      ["En esa pausa matinal se esconde una filosofía: la de no dejar que el trabajo devore el placer de vivir.","В этой утренней паузе скрыта философия: не дать работе поглотить удовольствие жить."],
      ["Desayunar sin prisa es un pequeño acto de resistencia frente al ritmo frenético del mundo.","Завтракать не спеша — маленький акт сопротивления бешеному ритму мира."],
    ], words:[["el desayuno","завтрак"],["el café con leche","кофе с молоком"],["la tostada","тост"],["el camarero","официант"],["charlar","болтать"],["la costumbre","привычка"],["la prisa","спешка"],["tranquilo","спокойный"]],
      grammar:"Presente de verbos -ar: yo hablo, tú hablas, él habla, nosotros hablamos, vosotros habláis, ellos hablan.",
      task:"Describe tu desayuno ideal en español, en presente (3–4 frases)." },

    { theme:"Сиеста и ритм дня", read:[
      ["En el sur de España, las tardes de verano son largas y muy calurosas.","На юге Испании летние дни долгие и очень жаркие."],
      ["Por eso, después de comer, muchas tiendas cierran unas horas.","Поэтому после обеда многие магазины закрываются на несколько часов."],
      ["Es la hora de la siesta, un breve descanso en lo más fuerte del calor.","Это время сиесты, короткий отдых в самый сильный зной."],
      ["No se trata de pereza, sino de respetar el cuerpo y el clima.","Дело не в лени, а в уважении к телу и климату."],
      ["La gente descansa, lee o simplemente cierra los ojos un rato.","Люди отдыхают, читают или просто закрывают глаза ненадолго."],
      ["Cuando baja el sol, la ciudad despierta otra vez y sale a la calle.","Когда солнце спадает, город снова просыпается и выходит на улицу."],
      ["El día sigue el ritmo de la luz, no el del reloj.","День следует ритму света, а не часов."],
      ["La siesta nos recuerda que descansar también es parte de vivir bien.","Сиеста напоминает, что отдыхать — тоже часть того, чтобы жить хорошо."],
    ], readAdv:[
      ["La siesta, lejos de ser un signo de pereza, refleja una sabiduría antigua sobre los límites del cuerpo.","Сиеста, далёкая от того, чтобы быть признаком лени, отражает древнюю мудрость о пределах тела."],
      ["Adaptar la jornada a la luz y al calor es, en el fondo, vivir en armonía con la naturaleza.","Подстраивать день под свет и зной — в сущности, жить в согласии с природой."],
    ], words:[["la siesta","сиеста"],["el descanso","отдых"],["el calor","жара"],["la tarde","вечер; день"],["descansar","отдыхать"],["la pereza","лень"],["el ritmo","ритм"],["despertar","просыпаться"]],
      grammar:"Verbos reflexivos: despertarse, levantarse, relajarse. Me despierto, se cierra, nos levantamos.",
      task:"Describe tu rutina de la tarde en español, con un verbo reflexivo (me relajo…), 3 frases." },

    { theme:"Рынок и краски", read:[
      ["El mercado español es una fiesta para los ojos y para la nariz.","Испанский рынок — праздник для глаз и для носа."],
      ["Hay naranjas, pimientos rojos, aceitunas verdes y pescado fresco.","Там апельсины, красные перцы, зелёные оливки и свежая рыба."],
      ["Los vendedores gritan los precios con energía y buen humor.","Продавцы выкрикивают цены с энергией и хорошим настроением."],
      ["Las señoras eligen con cuidado y conversan con cada vendedor.","Дамы выбирают с заботой и беседуют с каждым продавцом."],
      ["Todo huele a mar, a fruta madura y a especias del sur.","Всё пахнет морем, спелыми фруктами и южными специями."],
      ["Comprar aquí no es solo llenar la bolsa: es vivir el barrio.","Покупать здесь — не просто наполнить сумку: это жить жизнью квартала."],
      ["Con productos sencillos y frescos se cocinan los mejores platos.","Из простых и свежих продуктов готовят лучшие блюда."],
      ["El mercado nos enseña a disfrutar de lo cotidiano y de lo cercano.","Рынок учит наслаждаться повседневным и близким."],
    ], readAdv:[
      ["El mercado es el corazón palpitante del barrio, donde el comercio se vuelve encuentro humano.","Рынок — бьющееся сердце квартала, где торговля становится человеческой встречей."],
      ["En sus colores y voces sobrevive una forma de vida más lenta, sensorial y comunitaria.","В его красках и голосах выживает более медленный, чувственный и общинный уклад жизни."],
    ], words:[["el mercado","рынок"],["la naranja","апельсин"],["el pimiento","перец"],["la aceituna","олива"],["maduro","спелый"],["fresco","свежий"],["el vendedor","продавец"],["disfrutar","наслаждаться"]],
      grammar:"Ser vs estar: ser (постоянное свойство: es fresco) / estar (состояние, место: está maduro, está en el mercado).",
      task:"Describe un mercado o una tienda en español, usando ser y estar (3–4 frases)." },

    { theme:"Музыка и танец", read:[
      ["En España, la música y el baile forman parte de la vida diaria.","В Испании музыка и танец — часть повседневной жизни."],
      ["En cada región hay un ritmo distinto, una forma propia de moverse.","В каждом регионе свой ритм, своя манера двигаться."],
      ["En el sur está el flamenco; en el norte, otras danzas más antiguas.","На юге — фламенко; на севере — другие, более древние танцы."],
      ["En las fiestas, jóvenes y mayores bailan juntos hasta muy tarde.","На праздниках молодые и старшие танцуют вместе до глубокой ночи."],
      ["No importa bailar bien; importa sentir la música y disfrutar.","Неважно танцевать хорошо; важно чувствовать музыку и наслаждаться."],
      ["La guitarra, las palmas y la voz crean una emoción muy fuerte.","Гитара, хлопки и голос создают очень сильную эмоцию."],
      ["El baile une a la gente sin necesidad de muchas palabras.","Танец объединяет людей без надобности в многих словах."],
      ["Quizá por eso, en España, la alegría se comparte siempre en grupo.","Возможно, поэтому в Испании радость всегда делят вместе."],
    ], readAdv:[
      ["El flamenco nació del dolor y de la mezcla de culturas, y por eso conmueve tan hondo.","Фламенко родилось из боли и смешения культур, и потому трогает так глубоко."],
      ["Bailar, en España, no es exhibirse, sino dejar que el cuerpo diga lo que las palabras callan.","Танцевать в Испании — не красоваться, а дать телу сказать то, о чём молчат слова."],
    ], words:[["la música","музыка"],["el baile","танец"],["bailar","танцевать"],["la guitarra","гитара"],["las palmas","хлопки в ладоши"],["la fiesta","праздник"],["la alegría","радость"],["sentir","чувствовать"]],
      grammar:"Gerundio — -ando / -iendo. estar + gerundio = действие сейчас: estoy bailando, sigo cantando.",
      task:"Describe una fiesta en español usando el gerundio (bailando, cantando…), 3 frases." },

    { theme:"Беседа за столом", read:[
      ["En España existe una costumbre muy querida que se llama « la sobremesa ».","В Испании есть очень любимая традиция под названием «la sobremesa»."],
      ["Es el tiempo que se queda en la mesa, hablando, después de comer.","Это время, которое остаются за столом, беседуя, после еды."],
      ["La comida ya ha terminado, pero nadie quiere levantarse todavía.","Еда уже закончилась, но никто пока не хочет вставать."],
      ["Se toma un café, quizá un postre, y la conversación sigue y sigue.","Берут кофе, может, десерт, и разговор всё длится и длится."],
      ["Se habla de la vida, de la familia, de recuerdos y de planes.","Говорят о жизни, о семье, о воспоминаниях и планах."],
      ["La sobremesa puede durar más que la propia comida.","Sobremesa может длиться дольше самой трапезы."],
      ["No es perder el tiempo: es el verdadero placer de estar juntos.","Это не потеря времени: это истинное удовольствие быть вместе."],
      ["La sobremesa nos enseña que las mejores cosas no tienen prisa.","Sobremesa учит, что лучшие вещи не торопятся."],
    ], readAdv:[
      ["La sobremesa es quizá la institución más sabia de la cultura española: el arte de no tener prisa.","Sobremesa — пожалуй, мудрейший институт испанской культуры: искусство не спешить."],
      ["En un mundo que mide el tiempo en dinero, demorarse a la mesa es un lujo silencioso y profundo.","В мире, где время измеряют деньгами, задержаться за столом — тихая и глубокая роскошь."],
    ], words:[["la sobremesa","беседа за столом после еды"],["la mesa","стол"],["la conversación","разговор"],["el postre","десерт"],["quedarse","оставаться"],["el recuerdo","воспоминание"],["demorarse","задерживаться"],["el placer","удовольствие"]],
      grammar:"Pretérito perfecto: he comido, ha terminado, hemos hablado (haber + participio) — действие, связанное с настоящим.",
      task:"Cuenta qué has hecho hoy en español, con el pretérito perfecto (he…, ha…), 3 frases." },

    { theme:"Юг и море", read:[
      ["El sur de España vive de cara al mar y al sol.","Юг Испании живёт лицом к морю и солнцу."],
      ["Los pueblos blancos brillan sobre las colinas, entre olivos y viñas.","Белые деревни сияют на холмах, среди олив и виноградников."],
      ["Por la mañana, los pescadores vuelven con las redes llenas.","Утром рыбаки возвращаются с полными сетями."],
      ["A mediodía, todo se detiene bajo el calor y el cielo azul.","В полдень всё замирает под зноем и синим небом."],
      ["Las calles estrechas guardan la sombra y un fresco silencio.","Узкие улочки хранят тень и прохладную тишину."],
      ["Al atardecer, la gente baja al paseo a respirar la brisa del mar.","Под вечер люди спускаются на набережную подышать морским бризом."],
      ["Se cena tarde, al aire libre, con el rumor de las olas cercanas.","Ужинают поздно, под открытым небом, под шум близких волн."],
      ["El sur enseña a vivir con calma, con calor en el corazón.","Юг учит жить спокойно, с теплом в сердце."],
    ], readAdv:[
      ["En estos pueblos blancos pervive un modo de vida pausado que el norte apresurado casi ha olvidado.","В этих белых деревнях живёт неспешный уклад, который торопливый север почти забыл."],
      ["El sur no mide la riqueza en cosas, sino en luz, en tiempo y en encuentros.","Юг измеряет богатство не в вещах, а в свете, во времени и во встречах."],
    ], words:[["el sur","юг"],["el pueblo","деревня; народ"],["la colina","холм"],["el olivo","оливковое дерево"],["la brisa","бриз"],["la sombra","тень"],["estrecho","узкий"],["pausado","неспешный"]],
      grammar:"Pretérito indefinido: hablé, comió, vivieron — завершённое действие в прошлом (что сделал).",
      task:"Cuenta un día en un pueblo del sur en español, en pretérito indefinido (3 frases)." },
  ],
};
