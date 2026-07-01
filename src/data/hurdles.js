export const LEVELS = [
  { id: "ms", label: "중학생", shortLabel: "중등", color: "var(--level-ms)" },
  { id: "csat", label: "수능 준비 고등학생", shortLabel: "고등", color: "var(--level-csat)" },
  { id: "toeic", label: "토익 준비 대학생·성인", shortLabel: "토익", color: "var(--level-toeic)" },
  { id: "abroad", label: "해외 유학 준비", shortLabel: "유학", color: "var(--level-abroad)" },
];

export const HURDLES = [
  {
    id: 1,
    title: "문장은 딱 두 종류다",
    sub: "~이다 vs ~하다",
    core: "영어 문장은 결국 BE 동사와 DO 동사, 두 종류에서 시작된다.",
    body: "영문법 책을 펴면 1형식부터 5형식까지 쏟아집니다. 하지만 한국말로 생각해보면 단순합니다. 문장은 딱 두 종류입니다. 상태나 존재를 말하는 문장(~이다)과 동작이나 행위를 말하는 문장(~하다). 영어도 똑같습니다.",
    levels: {
      ms: {
        examples: [
          { en: "I am a middle school student.", ko: "나는 중학생이다. → BE 동사" },
          { en: "She is kind.", ko: "그녀는 친절하다. → BE 동사" },
          { en: "He plays basketball every day.", ko: "그는 매일 농구를 한다. → DO 동사" },
        ],
        summary: "BE 동사 = ~이다 | DO 동사 = ~하다. 중학교 영어의 첫걸음은 이 둘을 구분하는 것이다.",
        quizzes: [
          { q: "다음 중 BE 동사 문장은?", opts: ["I am happy.", "I run fast.", "I like pizza."], answer: 0, exp: "am은 BE 동사. 상태를 나타낸다." },
          { q: "다음 중 DO 동사 문장은?", opts: ["They are students.", "She reads books.", "It is cold."], answer: 1, exp: "reads는 DO 동사. 행동을 나타낸다." },
          { q: "We are friends. 의 동사 종류는?", opts: ["DO 동사", "BE 동사", "알 수 없음"], answer: 1, exp: "are는 BE 동사. ~이다로 해석된다." },
        ],
      },
      csat: {
        examples: [
          { en: "The hypothesis remains unproven.", ko: "그 가설은 아직 증명되지 않은 상태다. → BE 동사" },
          { en: "The committee reviews each application thoroughly.", ko: "위원회는 각 지원서를 꼼꼼히 검토한다. → DO 동사" },
          { en: "Renewable energy is becoming increasingly important.", ko: "재생에너지는 점점 더 중요해지고 있다. → BE 동사" },
        ],
        summary: "수능 지문은 추상적 주어(이론, 현상, 정책)에 BE/DO 동사가 결합된 문장이 많다. 동사 종류를 먼저 구분하면 지문의 논리 구조가 보인다.",
        quizzes: [
          { q: "밑줄 친 동사의 종류가 다른 하나는?", opts: ["The result remains uncertain.", "The data supports the hypothesis.", "She appears confident."], answer: 1, exp: "supports는 DO 동사(행동). remains, appears는 상태 동사." },
          { q: "The theory has been widely accepted. 의 핵심 동사 종류는?", opts: ["BE 동사 계열", "순수 DO 동사", "조동사만"], answer: 0, exp: "has been accepted는 BE 동사 계열(수동/상태)." },
          { q: "다음 중 DO 동사가 쓰인 문장은?", opts: ["The issue seems complicated.", "Researchers examine the data.", "The result is surprising."], answer: 1, exp: "examine은 행동을 나타내는 DO 동사." },
        ],
      },
      toeic: {
        examples: [
          { en: "The proposal is subject to approval by the board.", ko: "그 제안은 이사회 승인을 받아야 한다. → BE 동사" },
          { en: "The department handles all customer inquiries.", ko: "그 부서는 모든 고객 문의를 처리한다. → DO 동사" },
          { en: "The meeting is scheduled for 3 PM.", ko: "회의는 오후 3시로 예정되어 있다. → BE 동사" },
        ],
        summary: "토익 Part 5·6에서는 빈칸에 BE 동사(is/are/was)와 DO 동사(do/does/has) 중 무엇이 와야 하는지 묻는 문제가 자주 나온다. 문맥이 '상태'인지 '행동'인지 먼저 판단하라.",
        quizzes: [
          { q: "빈칸에 알맞은 것은? The new policy ___ effective immediately.", opts: ["is", "does", "has"], answer: 0, exp: "'효력이 있는 상태이다' = BE 동사 is." },
          { q: "The manager ___ the report every Monday. 빈칸에 알맞은 것은?", opts: ["is", "reviews", "was"], answer: 1, exp: "'검토한다'는 행동 = DO 동사 reviews." },
          { q: "All employees ___ required to attend the training. 빈칸은?", opts: ["are", "do", "have"], answer: 0, exp: "'요구되는 상태이다' = BE 동사 are." },
        ],
      },
      abroad: {
        examples: [
          { en: "Applicants are expected to demonstrate independent research capability.", ko: "지원자는 독립적 연구 능력을 입증할 것으로 기대된다. → BE 동사" },
          { en: "The faculty evaluates each thesis based on originality.", ko: "교수진은 독창성을 기준으로 각 논문을 평가한다. → DO 동사" },
          { en: "Academic integrity is taken seriously at this institution.", ko: "이 기관에서는 학문적 진실성을 중요하게 여긴다. → BE 동사" },
        ],
        summary: "유학 지원서와 학술 문서는 'be expected to', 'is required' 같은 BE 동사 수동 구문이 많다. 동사가 상태(BE)인지 행위(DO)인지 구분하면 문서의 논조를 정확히 읽을 수 있다.",
        quizzes: [
          { q: "다음 문장에서 핵심 동사의 종류는? Admission decisions are based on holistic review.", opts: ["BE 동사(상태)", "DO 동사(행동)", "둘 다 아님"], answer: 0, exp: "are based on = BE 동사 + 과거분사(상태)." },
          { q: "The university requires all applicants to submit transcripts. 의 동사는?", opts: ["BE 동사", "DO 동사", "조동사"], answer: 1, exp: "requires는 행동을 나타내는 DO 동사." },
          { q: "Students are encouraged to participate in research. 에서 encouraged는?", opts: ["동사원형", "BE 동사 뒤의 상태 표현", "목적어"], answer: 1, exp: "are encouraged = BE 동사 + 형용사(상태). 격려받는 상태." },
        ],
      },
    },
  },
  {
    id: 2,
    title: "주어와 목적어는 문장의 축",
    sub: "JECT — 공간에 던져진 것",
    core: "주어는 내 안에서 꺼낸 것. 목적어는 눈앞에 놓인 것.",
    body: "SUBJECT의 SUB는 '아래에서'입니다. 내 마음속에서 끌어올려 던진 것이 주어입니다. OBJECT의 OB는 '바로 앞에'입니다. 눈앞에 뚜렷하게 놓인 것이 목적어입니다. JECT는 공간에 던져진 모든 것이며, 단어→구→절로 무한 확장됩니다.",
    levels: {
      ms: {
        examples: [
          { en: "Tom likes pizza.", ko: "톰(주어)이 피자(목적어)를 좋아한다." },
          { en: "My dog chased the cat.", ko: "내 강아지(주어)가 고양이(목적어)를 쫓았다." },
          { en: "I know his name.", ko: "나는 그의 이름(목적어)을 안다." },
        ],
        summary: "주어는 문장을 시작하는 사람·것, 목적어는 동사의 행동을 받는 대상이다.",
        quizzes: [
          { q: "Tom likes pizza. 에서 목적어는?", opts: ["Tom", "likes", "pizza"], answer: 2, exp: "pizza가 좋아하는 대상 = 목적어." },
          { q: "주어는 보통 문장의 어디에 오는가?", opts: ["맨 앞", "맨 뒤", "동사 뒤"], answer: 0, exp: "주어는 대개 문장 맨 앞에 온다." },
          { q: "I know his name. 에서 주어는?", opts: ["I", "know", "his name"], answer: 0, exp: "I가 아는 행동을 하는 주어." },
        ],
      },
      csat: {
        examples: [
          { en: "The government proposed a new policy.", ko: "정부(주어)가 새로운 정책(목적어)을 제안했다." },
          { en: "Researchers observed a significant change.", ko: "연구자들(주어)이 뚜렷한 변화(목적어)를 관찰했다." },
          { en: "I understand the argument that the author makes.", ko: "절 전체가 목적어 자리에 들어간 예." },
        ],
        summary: "수능 지문에서는 주어·목적어가 긴 명사구·명사절로 확장되는 경우가 많다. 핵심 명사를 먼저 찾아야 문장을 빠르게 해석할 수 있다.",
        quizzes: [
          { q: "The study reveals a surprising trend. 에서 목적어는?", opts: ["The study", "reveals", "a surprising trend"], answer: 2, exp: "trend가 밝혀지는 대상 = 목적어." },
          { q: "I believe that the plan will succeed. 에서 목적어는?", opts: ["I", "believe", "that the plan will succeed"], answer: 2, exp: "that절 전체가 목적어." },
          { q: "긴 명사절이 목적어로 쓰일 때의 특징은?", opts: ["항상 생략된다", "절 전체가 하나의 명사처럼 움직인다", "동사로 바뀐다"], answer: 1, exp: "명사절은 통째로 목적어 역할을 한다." },
        ],
      },
      toeic: {
        examples: [
          { en: "The company launched a new product.", ko: "회사(주어)가 신제품(목적어)을 출시했다." },
          { en: "Management reviewed the quarterly report.", ko: "경영진(주어)이 분기 보고서(목적어)를 검토했다." },
          { en: "We appreciate your prompt response.", ko: "귀하의 신속한 답변(목적어)에 감사드립니다." },
        ],
        summary: "토익 이메일·공지문에서는 주어가 회사·부서, 목적어가 문서·요청사항인 경우가 많다. 누가(주어) 무엇을(목적어) 했는지 빠르게 파악하는 연습이 필요하다.",
        quizzes: [
          { q: "The client requested a full refund. 에서 목적어는?", opts: ["The client", "requested", "a full refund"], answer: 2, exp: "refund가 요청받은 대상." },
          { q: "Please review the attached document. 에서 목적어는?", opts: ["Please", "review", "the attached document"], answer: 2, exp: "document가 검토 대상." },
          { q: "We value your feedback. 에서 주어는?", opts: ["We", "value", "your feedback"], answer: 0, exp: "We가 가치 있게 여기는 주체 = 주어." },
        ],
      },
      abroad: {
        examples: [
          { en: "The committee evaluates applicants holistically.", ko: "위원회(주어)가 지원자(목적어)를 종합적으로 평가한다." },
          { en: "The university offers extensive research opportunities.", ko: "대학교(주어)가 폭넓은 연구 기회(목적어)를 제공한다." },
          { en: "I recognize the challenges that studying abroad presents.", ko: "절이 목적어 자리에 들어간 학술적 예." },
        ],
        summary: "유학 지원서·에세이에서는 주어가 기관·프로그램, 목적어가 기회·자격요건인 문장이 흔하다. 문장이 길어도 핵심 주어-동사-목적어만 뽑아내면 뜻이 명확해진다.",
        quizzes: [
          { q: "The program requires two letters of recommendation. 에서 목적어는?", opts: ["The program", "requires", "two letters of recommendation"], answer: 2, exp: "letters가 요구되는 대상." },
          { q: "The opportunity that this scholarship provides is invaluable. 에서 주어는?", opts: ["that this scholarship provides", "The opportunity that this scholarship provides", "is invaluable"], answer: 1, exp: "긴 명사구 전체가 주어." },
          { q: "유학 에세이에서 주어-목적어를 빠르게 찾는 이유는?", opts: ["문법 점수 때문", "문장의 핵심 의미를 빨리 파악하기 위해", "단어 수를 줄이기 위해"], answer: 1, exp: "주어-동사-목적어만 뽑으면 긴 문장도 빠르게 이해된다." },
        ],
      },
    },
  },
  {
    id: 3,
    title: "동사가 문장의 엔진이다",
    sub: "동사를 잡으면 문장이 보인다",
    core: "엔진 없는 차는 고철이다. 동사 없는 문장은 존재하지 않는다.",
    body: "긴 영어 문장을 만났을 때 어디서부터 읽어야 할지 모르겠다면 동사를 먼저 찾으십시오. BE 동사는 등호(=)입니다. 주어와 뒤의 말을 같다고 연결합니다. DO 동사는 화살표(→)입니다. 주어의 에너지가 목적어를 향해 쏘아집니다.",
    levels: {
      ms: {
        examples: [
          { en: "She is a doctor.", ko: "그녀 = 의사. BE 동사는 등호(=)" },
          { en: "She treats patients.", ko: "그녀 → 환자들. DO 동사는 화살표(→)" },
          { en: "The tall boy runs fast.", ko: "길어도 엔진은 runs 하나" },
        ],
        summary: "BE 동사: 주어 = 보어 | DO 동사: 주어 → 목적어. 문장에서 동사부터 찾는 습관을 들이자.",
        quizzes: [
          { q: "She is a doctor. 에서 동사의 역할은?", opts: ["화살표(→)", "등호(=)", "시간 표현"], answer: 1, exp: "is는 BE 동사 = 등호. 그녀 = 의사를 연결한다." },
          { q: "문장에서 동사를 먼저 찾는 이유는?", opts: ["문장이 짧아 보여서", "동사가 문장의 엔진이기 때문", "문법 규칙이라서"], answer: 1, exp: "동사를 찾으면 문장 구조가 보인다." },
          { q: "He played soccer yesterday. 에서 시간을 나타내는 것은?", opts: ["He", "played", "soccer"], answer: 1, exp: "played(과거형)가 시간을 담는다." },
        ],
      },
      csat: {
        examples: [
          { en: "The theory challenges conventional assumptions.", ko: "그 이론 → 통념. DO 동사(화살표)" },
          { en: "The outcome remains inconclusive.", ko: "결과 = 불확실한 상태. BE 동사(등호)" },
          { en: "The complex system, despite its many flaws, still functions.", ko: "길어도 엔진은 functions 하나" },
        ],
        summary: "수능 지문에서 문장이 길어질수록 수식어에 휘둘리기 쉽다. 삽입구를 걷어내고 진짜 동사를 찾으면 핵심 의미가 남는다.",
        quizzes: [
          { q: "The policy, though controversial, achieves its goal. 에서 진짜 동사는?", opts: ["is", "achieves", "though"], answer: 1, exp: "삽입구(though controversial)를 걷어내면 achieves가 진짜 동사." },
          { q: "BE 동사가 '등호'로 기능한다는 것의 의미는?", opts: ["주어와 보어가 같다는 뜻", "동작이 진행 중이라는 뜻", "미래를 나타낸다는 뜻"], answer: 0, exp: "BE 동사는 주어=보어의 관계를 만든다." },
          { q: "The data, collected over a decade, reveals a clear pattern. 의 동사는?", opts: ["collected", "reveals", "over"], answer: 1, exp: "collected는 과거분사(수식어), 진짜 동사는 reveals." },
        ],
      },
      toeic: {
        examples: [
          { en: "The firm is a leading provider of logistics services.", ko: "회사 = 물류 서비스 제공업체. BE 동사(등호)" },
          { en: "The team delivers projects ahead of schedule.", ko: "팀 → 프로젝트. DO 동사(화살표)" },
          { en: "The revised contract, effective next month, requires signatures.", ko: "길어도 엔진은 requires 하나" },
        ],
        summary: "토익 Part 6·7의 긴 문장도 결국 동사 하나가 핵심이다. 수식어(관계사절, 삽입구)를 무시하고 동사부터 찾으면 빈칸 문제 속도가 빨라진다.",
        quizzes: [
          { q: "The invoice, which was sent last week, remains unpaid. 의 진짜 동사는?", opts: ["was sent", "remains", "which"], answer: 1, exp: "which was sent는 수식어. 진짜 동사는 remains." },
          { q: "Our team provides 24/7 customer support. 의 동사 종류는?", opts: ["BE 동사(등호)", "DO 동사(화살표)", "둘 다 아님"], answer: 1, exp: "provides는 팀 → 지원. DO 동사." },
          { q: "The proposal is expected to increase revenue. 의 핵심 동사는?", opts: ["is expected", "to increase", "revenue"], answer: 0, exp: "is expected가 문장의 핵심 동사. to increase는 부정사구." },
        ],
      },
      abroad: {
        examples: [
          { en: "The dissertation examines the socioeconomic impact of migration.", ko: "논문 → 영향. DO 동사(화살표)" },
          { en: "The methodology remains consistent across all case studies.", ko: "방법론 = 일관된 상태. BE 동사(등호)" },
          { en: "The professor, who has published extensively in this field, argues otherwise.", ko: "길어도 엔진은 argues 하나" },
        ],
        summary: "학술 논문·에세이는 관계사절과 삽입구로 문장이 매우 길어진다. 주어 뒤 콤마 사이 수식어를 괄호로 묶어 지우면 진짜 동사가 보인다.",
        quizzes: [
          { q: "The research, funded by a national grant, investigates climate patterns. 의 진짜 동사는?", opts: ["funded", "investigates", "grant"], answer: 1, exp: "funded by a national grant는 수식어. 진짜 동사는 investigates." },
          { q: "This finding is significant for future research. 의 동사 종류는?", opts: ["BE 동사(등호)", "DO 동사(화살표)", "조동사"], answer: 0, exp: "is가 finding = significant를 연결." },
          { q: "긴 학술 문장을 읽을 때 가장 먼저 해야 할 일은?", opts: ["모든 단어를 해석한다", "진짜 동사부터 찾는다", "접속사를 센다"], answer: 1, exp: "동사를 찾으면 문장의 뼈대가 드러난다." },
        ],
      },
    },
  },
  {
    id: 4,
    title: "명사는 단어가 아니다",
    sub: "단어→구→절, 땅에서 우주까지",
    core: "명사를 단어 하나로만 보는 순간 영어 문장의 절반이 안 보인다.",
    body: "명사는 무한히 확장됩니다. 단어(땅) → 구(하늘) → 절(우주). 긴 영어 문장이 무서운 이유는 명사가 덩어리로 움직이기 때문입니다. 명사는 문장 안에서 세 자리에만 앉습니다: 주어 자리, 목적어 자리, 보어 자리.",
    levels: {
      ms: {
        examples: [
          { en: "friend / my best friend", ko: "친구(단어) → 나의 가장 친한 친구(구)" },
          { en: "What I like is music.", ko: "What I like(절)가 주어 자리에" },
          { en: "I know that she is nice.", ko: "that she is nice(절)가 목적어 자리에" },
        ],
        summary: "명사 단어(땅) | 명사구(하늘) | 명사절(우주). 명사는 점점 커질 수 있다.",
        quizzes: [
          { q: "What I like is music. 에서 주어는?", opts: ["What", "I", "What I like"], answer: 2, exp: "What I like 전체가 주어." },
          { q: "명사가 올 수 없는 자리는?", opts: ["주어 자리", "동사 자리", "목적어 자리"], answer: 1, exp: "동사 자리에는 동사만 온다." },
          { q: "my best friend는 명사의 어떤 형태인가?", opts: ["명사 단어", "명사구", "명사절"], answer: 1, exp: "두 단어 이상이 합쳐진 명사 덩어리 = 명사구." },
        ],
      },
      csat: {
        examples: [
          { en: "phenomenon / a widespread phenomenon", ko: "현상(단어) → 널리 퍼진 현상(구)" },
          { en: "What the author implies is often debated.", ko: "What the author implies(절)가 주어 자리에" },
          { en: "The study confirms that the correlation is weak.", ko: "that절(명사절)이 목적어 자리에" },
        ],
        summary: "수능 지문은 명사절 주어·목적어가 유난히 많다. 절 전체를 하나의 '큰 명사'로 인식하는 훈련이 독해 속도를 좌우한다.",
        quizzes: [
          { q: "What the data suggests remains controversial. 에서 주어는?", opts: ["What", "the data suggests", "What the data suggests"], answer: 2, exp: "명사절 전체가 주어." },
          { q: "The report shows that emissions have declined. 에서 목적어절은?", opts: ["The report", "shows", "that emissions have declined"], answer: 2, exp: "that절 전체가 shows의 목적어." },
          { q: "명사절이 문장에서 하는 역할은?", opts: ["항상 부사처럼 움직인다", "절 전체가 명사처럼 움직인다", "동사를 대신한다"], answer: 1, exp: "명사절은 단어 하나처럼 주어·목적어·보어 자리에 들어간다." },
        ],
      },
      toeic: {
        examples: [
          { en: "proposal / a detailed proposal", ko: "제안(단어) → 상세한 제안(구)" },
          { en: "What the client wants is a faster turnaround.", ko: "What the client wants(절)가 주어 자리에" },
          { en: "We confirm that the shipment has arrived.", ko: "that절(명사절)이 목적어 자리에" },
        ],
        summary: "토익 비즈니스 문서에서는 'that + 절'이 confirm, ensure, indicate 같은 동사의 목적어로 자주 쓰인다. 절 전체를 명사 덩어리로 처리하면 빈칸·문장삽입 문제가 쉬워진다.",
        quizzes: [
          { q: "We ensure that all orders are shipped on time. 에서 목적어는?", opts: ["We", "ensure", "that all orders are shipped on time"], answer: 2, exp: "that절 전체가 ensure의 목적어." },
          { q: "a detailed proposal은 명사의 어떤 형태인가?", opts: ["명사 단어", "명사구", "명사절"], answer: 1, exp: "형용사+명사로 이루어진 명사구." },
          { q: "What the client wants is a faster turnaround. 에서 주어는?", opts: ["What", "the client wants", "What the client wants"], answer: 2, exp: "명사절 전체가 주어." },
        ],
      },
      abroad: {
        examples: [
          { en: "hypothesis / a testable hypothesis", ko: "가설(단어) → 검증 가능한 가설(구)" },
          { en: "What the findings reveal challenges prior assumptions.", ko: "What the findings reveal(절)가 주어 자리에" },
          { en: "The committee acknowledges that the applicant's background is unique.", ko: "that절(명사절)이 목적어 자리에" },
        ],
        summary: "학술 에세이·연구계획서에서는 명사절 주어(What ~, That ~)로 문장을 시작하는 경우가 흔하다. 절을 하나의 명사 덩어리로 묶어 읽는 습관이 독해력의 핵심이다.",
        quizzes: [
          { q: "That the sample size was small limits the study's validity. 에서 주어는?", opts: ["That", "the sample size was small", "That the sample size was small"], answer: 2, exp: "That절 전체가 주어." },
          { q: "The panel recognizes that the candidate shows strong potential. 에서 목적어절은?", opts: ["The panel", "recognizes", "that the candidate shows strong potential"], answer: 2, exp: "that절 전체가 recognizes의 목적어." },
          { q: "a testable hypothesis는 명사의 어떤 형태인가?", opts: ["명사 단어", "명사구", "명사절"], answer: 1, exp: "형용사+명사의 명사구." },
        ],
      },
    },
  },
  {
    id: 5,
    title: "형용사는 하나다",
    sub: "분사·관계사절, 전부 명사를 꾸민다",
    core: "이름이 달라도 하는 일은 하나. 명사를 꾸며준다.",
    body: "현재분사, 과거분사, 분사구문, 관계사절... 전부 명사를 꾸며주는 형용사입니다. 단어→구→절로 확장되는 것도 명사와 같습니다. 명사 뒤에 뭔가 길게 붙어있으면 그게 전부 그 명사를 꾸며주는 형용사입니다.",
    levels: {
      ms: {
        examples: [
          { en: "a sleeping baby", ko: "sleeping(현재분사)이 명사를 꾸밈 = 형용사 단어" },
          { en: "the boy playing soccer", ko: "playing soccer = 형용사구" },
          { en: "the boy who plays soccer", ko: "who plays soccer = 관계사절 = 형용사절" },
        ],
        summary: "형용사 단어: 분사 | 형용사구: 분사+나머지 말 | 형용사절: who/which/that+절. 셋 다 명사를 꾸민다.",
        quizzes: [
          { q: "the girl reading a book 에서 reading a book의 역할은?", opts: ["동사", "명사를 꾸미는 형용사구", "부사"], answer: 1, exp: "girl(명사)을 꾸미는 형용사구." },
          { q: "who, which, that로 시작하는 절의 역할은?", opts: ["명사", "명사를 꾸미는 형용사절", "부사절"], answer: 1, exp: "관계사절은 앞의 명사를 꾸민다." },
          { q: "형용사의 공통 역할은?", opts: ["동사를 꾸민다", "명사를 꾸민다", "문장을 연결한다"], answer: 1, exp: "형용사는 항상 명사를 꾸민다." },
        ],
      },
      csat: {
        examples: [
          { en: "a widely cited study", ko: "cited(과거분사)가 명사를 꾸밈 = 형용사 단어" },
          { en: "a policy aimed at reducing emissions", ko: "aimed at reducing emissions = 형용사구" },
          { en: "a policy that experts have long debated", ko: "that experts have long debated = 관계사절" },
        ],
        summary: "수능 지문의 긴 주어는 대부분 '명사 + 분사구/관계사절'로 구성된다. 수식어를 걷어내고 핵심 명사만 남기면 문장이 짧아진다.",
        quizzes: [
          { q: "The report published last year challenges earlier findings. 에서 published last year의 역할은?", opts: ["동사구", "명사(report)를 꾸미는 형용사구", "부사구"], answer: 1, exp: "report를 꾸미는 형용사구(과거분사구)." },
          { q: "관계사절이 명사 뒤에 붙는 이유는?", opts: ["문장을 길게 하려고", "명사를 더 구체적으로 꾸미기 위해", "시제를 표현하려고"], answer: 1, exp: "관계사절은 앞의 명사를 구체적으로 설명한다." },
          { q: "a rapidly changing environment 에서 changing의 역할은?", opts: ["동사", "명사를 꾸미는 형용사(현재분사)", "부사"], answer: 1, exp: "environment를 꾸미는 현재분사." },
        ],
      },
      toeic: {
        examples: [
          { en: "the attached invoice", ko: "attached(과거분사)가 명사를 꾸밈 = 형용사 단어" },
          { en: "employees working overtime", ko: "working overtime = 형용사구" },
          { en: "the candidate who impressed the panel", ko: "who impressed the panel = 관계사절" },
        ],
        summary: "토익 문서에는 '수식받는 명사 + 분사/관계사절' 구조가 흔하다(예: attached document, employees hired recently). 명사 뒤 수식어를 정확히 구분하면 Part 7 지문이 빨리 읽힌다.",
        quizzes: [
          { q: "Please review the document attached to this email. 에서 attached to this email의 역할은?", opts: ["동사구", "document를 꾸미는 형용사구", "부사구"], answer: 1, exp: "document를 꾸미는 과거분사구." },
          { q: "employees working overtime 에서 working overtime은?", opts: ["명사절", "employees를 꾸미는 형용사구", "동사구"], answer: 1, exp: "employees를 꾸미는 현재분사구." },
          { q: "the candidate who impressed the panel 에서 who impressed the panel의 역할은?", opts: ["명사절", "candidate를 꾸미는 형용사절", "부사절"], answer: 1, exp: "candidate를 꾸미는 관계사절." },
        ],
      },
      abroad: {
        examples: [
          { en: "a frequently overlooked variable", ko: "overlooked(과거분사)가 명사를 꾸밈 = 형용사 단어" },
          { en: "a methodology grounded in qualitative analysis", ko: "grounded in qualitative analysis = 형용사구" },
          { en: "a hypothesis that subsequent research has confirmed", ko: "that subsequent research has confirmed = 관계사절" },
        ],
        summary: "학술 논문의 주어는 '핵심 명사 + 긴 분사구/관계사절'로 겹겹이 확장된다. 유학 지원 에세이를 쓸 때도 이 구조를 활용하면 문장이 정교해진다.",
        quizzes: [
          { q: "A variable frequently overlooked in prior studies deserves attention. 에서 frequently overlooked in prior studies의 역할은?", opts: ["동사구", "variable을 꾸미는 형용사구", "부사구"], answer: 1, exp: "variable을 꾸미는 과거분사구." },
          { q: "a methodology grounded in qualitative analysis 에서 grounded의 역할은?", opts: ["동사", "명사를 꾸미는 형용사(과거분사)", "명사"], answer: 1, exp: "methodology를 꾸미는 과거분사." },
          { q: "학술 글쓰기에서 관계사절을 쓰는 목적은?", opts: ["문장을 짧게 하려고", "핵심 명사를 정밀하게 한정하기 위해", "시제를 통일하려고"], answer: 1, exp: "관계사절은 명사의 범위를 정밀하게 좁혀준다." },
        ],
      },
    },
  },
  {
    id: 6,
    title: "부사도 하나다",
    sub: "언제, 어디서, 어떻게, 왜",
    core: "명사 빼고 다 꾸며주는 것. 그게 부사다.",
    body: "부사는 동사를 꾸미고, 형용사를 꾸미고, 문장 전체를 꾸밉니다. 형용사와 다른 점은 위치가 자유롭습니다. 앞에 와도, 뒤에 와도, 중간에 와도 됩니다. 부사절 — 조건절, 이유절, 결과절, 양보절 — 전부 부사입니다.",
    levels: {
      ms: {
        examples: [
          { en: "She runs fast.", ko: "fast(부사 단어)가 동사 runs를 꾸밈" },
          { en: "She speaks in a soft voice.", ko: "in a soft voice(부사구)가 동사를 꾸밈" },
          { en: "If it rains, I will stay home.", ko: "절 전체가 부사절로 문장을 꾸밈" },
        ],
        summary: "부사 단어: fast, hard | 부사구: in a soft voice | 부사절: if, because, when. 명사 빼고 다 꾸민다.",
        quizzes: [
          { q: "She is very tall. 에서 very의 역할은?", opts: ["동사를 꾸민다", "형용사를 꾸민다", "명사를 꾸민다"], answer: 1, exp: "very는 형용사 tall을 꾸미는 부사." },
          { q: "If it rains, I will stay home. 에서 If절의 역할은?", opts: ["명사절", "형용사절", "부사절"], answer: 2, exp: "조건을 나타내는 If절은 부사절." },
          { q: "부사의 특징은?", opts: ["명사 자리에만 온다", "위치가 비교적 자유롭다", "반드시 동사 뒤에 온다"], answer: 1, exp: "부사는 문장 앞, 중간, 뒤 어디에도 올 수 있다." },
        ],
      },
      csat: {
        examples: [
          { en: "The results were unexpectedly consistent.", ko: "unexpectedly(부사)가 형용사 consistent를 꾸밈" },
          { en: "The theory holds true under most conditions.", ko: "under most conditions(부사구)가 동사를 꾸밈" },
          { en: "Although the data was limited, the conclusion was valid.", ko: "절 전체가 양보의 부사절" },
        ],
        summary: "수능 지문에서 부사절(although, even though, given that)은 필자의 논리 전환 신호다. 부사절을 발견하면 앞뒤 내용이 대조되거나 조건이 붙는다는 뜻이다.",
        quizzes: [
          { q: "Although the data was limited, the conclusion was valid. 에서 Although절의 역할은?", opts: ["명사절", "형용사절", "부사절(양보)"], answer: 2, exp: "Although = 비록 ~이지만. 부사절로 주절을 꾸민다." },
          { q: "The results were surprisingly robust. 에서 surprisingly의 역할은?", opts: ["동사를 꾸민다", "형용사 robust를 꾸민다", "명사를 꾸민다"], answer: 1, exp: "surprisingly는 형용사를 꾸미는 부사." },
          { q: "부사절이 지문에서 하는 기능은?", opts: ["새로운 정보를 나열한다", "조건·양보·이유 등 논리 관계를 표시한다", "주어를 대신한다"], answer: 1, exp: "부사절은 필자의 논리 전개(양보, 조건, 이유)를 신호한다." },
        ],
      },
      toeic: {
        examples: [
          { en: "The shipment arrived earlier than expected.", ko: "earlier than expected(부사구)가 동사를 꾸밈" },
          { en: "The system is currently under maintenance.", ko: "currently(부사)가 형용사구를 꾸밈" },
          { en: "Once the payment is confirmed, the order will be processed.", ko: "절 전체가 시간의 부사절" },
        ],
        summary: "토익 지문에서는 once, as soon as, provided that 같은 부사절 접속사가 업무 절차(조건 충족 후 다음 단계)를 설명할 때 자주 쓰인다.",
        quizzes: [
          { q: "Once the payment is confirmed, the order will be processed. 에서 Once절의 역할은?", opts: ["명사절", "형용사절", "부사절(시간)"], answer: 2, exp: "Once = ~하자마자. 시간을 나타내는 부사절." },
          { q: "The report was submitted promptly. 에서 promptly의 역할은?", opts: ["동사 submitted를 꾸민다", "명사 report를 꾸민다", "주어 역할을 한다"], answer: 0, exp: "promptly는 동사를 꾸미는 부사." },
          { q: "Provided that funding is approved, the project will begin in June. 에서 Provided that절은?", opts: ["명사절", "형용사절", "부사절(조건)"], answer: 2, exp: "Provided that = 만약 ~라면. 조건의 부사절." },
        ],
      },
      abroad: {
        examples: [
          { en: "The findings were statistically significant.", ko: "statistically(부사)가 형용사 significant를 꾸밈" },
          { en: "The theory applies broadly across disciplines.", ko: "broadly across disciplines(부사구)가 동사를 꾸밈" },
          { en: "Given that resources were constrained, the outcome was remarkable.", ko: "절 전체가 이유의 부사절" },
        ],
        summary: "학술 글쓰기에서는 given that, insofar as, whereas 같은 격식 있는 부사절 접속사를 사용해 논지를 정교하게 조건화한다. 유학 에세이에서 적극 활용할 부분이다.",
        quizzes: [
          { q: "Given that resources were constrained, the outcome was remarkable. 에서 Given that절의 역할은?", opts: ["명사절", "형용사절", "부사절(이유·조건)"], answer: 2, exp: "Given that = ~을 고려하면. 부사절로 배경 조건을 제시." },
          { q: "The results are theoretically consistent with prior models. 에서 theoretically의 역할은?", opts: ["동사를 꾸민다", "형용사 consistent를 꾸민다", "명사를 꾸민다"], answer: 1, exp: "theoretically는 형용사를 꾸미는 부사." },
          { q: "Whereas earlier studies focused on adults, this research targets adolescents. 에서 Whereas절은?", opts: ["명사절", "형용사절", "부사절(대조)"], answer: 2, exp: "Whereas = ~인 반면. 대조를 나타내는 부사절." },
        ],
      },
    },
  },
  {
    id: 7,
    title: "접속사는 문장을 변신시킨다",
    sub: "명사절·형용사절·부사절 접속사",
    core: "접속사는 문장을 명사, 형용사, 부사로 변신시키는 도구다.",
    body: "접속사는 어렵지 않습니다. 문장을 하나의 덩어리로 만들어서 명사, 형용사, 부사로 변신시키는 것이 전부입니다. 명사로 만들면 명사절 접속사, 형용사로 만들면 형용사절 접속사, 부사로 만들면 부사절 접속사입니다.",
    levels: {
      ms: {
        examples: [
          { en: "I know that she is smart.", ko: "that = 명사절 접속사 (절을 목적어로)" },
          { en: "The book that I read was fun.", ko: "that = 형용사절 접속사 (book을 꾸밈)" },
          { en: "If it rains, I'll stay home.", ko: "if = 부사절 접속사 (조건)" },
        ],
        summary: "명사절 접속사: that | 형용사절: who, which, that | 부사절: if, because, when. 변신의 목적지가 다르다.",
        quizzes: [
          { q: "I believe that he is honest. 에서 that의 역할은?", opts: ["형용사절 접속사", "명사절 접속사", "부사절 접속사"], answer: 1, exp: "that he is honest는 believe의 목적어(명사)가 된 명사절." },
          { q: "The man who called you is here. 에서 who의 역할은?", opts: ["명사절 접속사", "형용사절 접속사", "부사절 접속사"], answer: 1, exp: "who called you는 man(명사)을 꾸미는 형용사절." },
          { q: "Because it was cold, we stayed inside. 에서 Because는?", opts: ["명사절 접속사", "형용사절 접속사", "부사절 접속사"], answer: 2, exp: "Because = ~때문에. 부사절로 이유를 나타낸다." },
        ],
      },
      csat: {
        examples: [
          { en: "It is unclear whether the trend will continue.", ko: "whether = 명사절 접속사 (진주어)" },
          { en: "The mechanism by which the process occurs remains unknown.", ko: "by which = 형용사절 접속사 (mechanism을 꾸밈)" },
          { en: "Even though the sample was small, the results were significant.", ko: "even though = 부사절 접속사 (양보)" },
        ],
        summary: "수능 고난도 지문에는 whether, by which, even though 같은 확장된 접속사 형태가 자주 등장한다. 접속사가 무엇을 '명사·형용사·부사'로 바꾸는지 판단하는 게 핵심이다.",
        quizzes: [
          { q: "Whether the theory holds remains to be tested. 에서 Whether절의 역할은?", opts: ["명사절(주어)", "형용사절", "부사절"], answer: 0, exp: "Whether절이 문장의 주어(명사) 역할." },
          { q: "the reason why the experiment failed 에서 why절의 역할은?", opts: ["명사절", "형용사절(reason을 꾸밈)", "부사절"], answer: 1, exp: "why절은 reason(명사)을 꾸미는 형용사절." },
          { q: "Even though the evidence was weak, the claim persisted. 에서 Even though는?", opts: ["명사절 접속사", "형용사절 접속사", "부사절 접속사(양보)"], answer: 2, exp: "Even though = 비록 ~일지라도. 양보의 부사절." },
        ],
      },
      toeic: {
        examples: [
          { en: "Please confirm whether you will attend.", ko: "whether = 명사절 접속사 (목적어)" },
          { en: "The employee who submitted the report is on leave.", ko: "who = 형용사절 접속사 (employee를 꾸밈)" },
          { en: "As soon as the invoice is paid, we will ship the order.", ko: "as soon as = 부사절 접속사 (시간)" },
        ],
        summary: "토익 이메일에서는 whether(확인 요청), who/that(직원·제품 설명), as soon as/provided that(업무 절차) 접속사가 반복적으로 등장한다. 패턴화해서 익혀두면 Part 5·6 속도가 빨라진다.",
        quizzes: [
          { q: "Please let us know whether the schedule works for you. 에서 whether절의 역할은?", opts: ["명사절(목적어)", "형용사절", "부사절"], answer: 0, exp: "whether절이 know의 목적어(명사절)." },
          { q: "The product that we launched last month is selling well. 에서 that의 역할은?", opts: ["명사절 접속사", "형용사절 접속사", "부사절 접속사"], answer: 1, exp: "that we launched last month는 product를 꾸미는 형용사절." },
          { q: "As soon as approval is granted, work will begin. 에서 As soon as는?", opts: ["명사절 접속사", "형용사절 접속사", "부사절 접속사(시간)"], answer: 2, exp: "As soon as = ~하자마자. 시간의 부사절." },
        ],
      },
      abroad: {
        examples: [
          { en: "What remains uncertain is whether the model generalizes.", ko: "whether = 명사절 접속사 (보어)" },
          { en: "The framework upon which this study builds is well established.", ko: "upon which = 형용사절 접속사 (framework를 꾸밈)" },
          { en: "Insofar as the sample is representative, the findings generalize.", ko: "insofar as = 부사절 접속사 (조건적 이유)" },
        ],
        summary: "학술 논문·유학 에세이에서는 whether(불확실성 표현), 전치사+관계대명사(upon which, in which), insofar as 같은 격식체 접속사가 논지의 정밀도를 높인다.",
        quizzes: [
          { q: "What remains uncertain is whether the model generalizes. 에서 두 번째 whether절의 역할은?", opts: ["명사절(보어)", "형용사절", "부사절"], answer: 0, exp: "whether절이 is의 보어(명사절)." },
          { q: "The framework upon which this study builds is well established. 에서 upon which절의 역할은?", opts: ["명사절", "형용사절(framework를 꾸밈)", "부사절"], answer: 1, exp: "전치사+관계대명사절이 framework를 꾸미는 형용사절." },
          { q: "Insofar as the sample is representative, the findings generalize. 에서 Insofar as는?", opts: ["명사절 접속사", "형용사절 접속사", "부사절 접속사(조건)"], answer: 2, exp: "Insofar as = ~하는 한. 조건의 부사절." },
        ],
      },
    },
  },
  {
    id: 8,
    title: "시제는 시간의 좌표다",
    sub: "동사는 시간 위에 놓인다",
    core: "시간은 돌아오지 않는다. 동사가 그 좌표를 표시한다.",
    body: "시간은 원이 아닙니다. 직선입니다. 불 붙은 양초처럼 타서 날아갑니다. 동사는 그 직선 위의 좌표를 표시합니다. 현재, 과거, 미래. 그리고 완료형은 과거의 어느 시점과 현재를 연결합니다.",
    levels: {
      ms: {
        examples: [
          { en: "She is / was / will be a student.", ko: "동사가 바뀌면 시간이 바뀐다" },
          { en: "I have lived here for 3 years.", ko: "현재완료: 과거부터 지금까지 연결" },
          { en: "When I arrived, she had already left.", ko: "과거완료: 과거보다 더 이전" },
        ],
        summary: "현재: am/is/are | 과거: was/were, 동사ed | 현재완료: have/has + p.p. 동사로 시간을 표시한다.",
        quizzes: [
          { q: "I have studied English for 2 years. 의 시제는?", opts: ["과거", "현재완료", "미래"], answer: 1, exp: "have + studied(p.p.) = 현재완료." },
          { q: "시제가 중요한 이유는?", opts: ["문법 점수를 위해", "동사가 시간 좌표를 표시하기 때문", "원어민처럼 보이려고"], answer: 1, exp: "동사가 바뀌면 시간이 바뀐다." },
          { q: "When she arrived, he had already left. 에서 had left는?", opts: ["현재완료", "과거완료", "단순과거"], answer: 1, exp: "had + left(p.p.) = 과거완료." },
        ],
      },
      csat: {
        examples: [
          { en: "The policy has undergone several revisions since 2010.", ko: "현재완료: 2010년부터 지금까지 연결" },
          { en: "By the time the results were published, the theory had already been disproven.", ko: "과거완료: 발표 시점보다 더 이전" },
          { en: "The next study will likely confirm this trend.", ko: "미래: 예상되는 결과" },
        ],
        summary: "수능 지문은 현재완료(지속적 변화)와 과거완료(사건의 선후관계)를 정확히 구분해야 흐름이 잡힌다. '어느 시점 기준으로 더 이전'인지가 핵심이다.",
        quizzes: [
          { q: "By the time the results were published, the theory had already been disproven. 에서 시간의 순서는?", opts: ["disproven이 먼저, published가 나중", "published가 먼저, disproven이 나중", "동시에 발생"], answer: 0, exp: "had been disproven(과거완료)이 published(과거)보다 더 이전." },
          { q: "The policy has undergone several revisions since 2010. 의 시제가 나타내는 것은?", opts: ["과거의 한 시점", "2010년부터 현재까지의 지속", "미래의 계획"], answer: 1, exp: "현재완료는 과거~현재까지의 연결을 나타낸다." },
          { q: "지문에서 과거완료가 나오면 무엇을 확인해야 하는가?", opts: ["단어 뜻", "기준이 되는 과거 시점보다 더 이전 사건인지", "주어의 인칭"], answer: 1, exp: "과거완료는 다른 과거 사건보다 먼저 일어난 일을 표시한다." },
        ],
      },
      toeic: {
        examples: [
          { en: "The company has expanded into three new markets this year.", ko: "현재완료: 올해 들어 지금까지의 실적" },
          { en: "By the time the client called, we had already shipped the order.", ko: "과거완료: 전화 시점보다 더 이전" },
          { en: "The new policy will take effect next month.", ko: "미래: 예정된 시행" },
        ],
        summary: "토익 Part 5는 현재완료(this year, so far와 함께)와 미래(next month, upon completion과 함께) 힌트 단어로 정답 시제를 고른다. 문장 속 시간 표현을 먼저 찾아라.",
        quizzes: [
          { q: "The team ___ the project by next Friday. 빈칸에 알맞은 것은?", opts: ["will have completed", "completed", "completes"], answer: 0, exp: "by next Friday(미래의 특정 시점까지) = 미래완료." },
          { q: "Sales ___ significantly since the new product launched. 빈칸에 알맞은 것은?", opts: ["increased", "have increased", "will increase"], answer: 1, exp: "since와 함께 쓰이는 현재완료." },
          { q: "By the time the client called, we had already shipped the order. 에서 시간 순서는?", opts: ["shipped가 먼저, called가 나중", "called가 먼저, shipped가 나중", "동시"], answer: 0, exp: "had shipped(과거완료)가 called(과거)보다 더 이전." },
        ],
      },
      abroad: {
        examples: [
          { en: "Scholars have long debated the origins of this phenomenon.", ko: "현재완료: 오랫동안 지금까지 이어진 논쟁" },
          { en: "By the time the theory was formalized, earlier models had already been abandoned.", ko: "과거완료: 정립 시점보다 더 이전" },
          { en: "Future research will need to address this limitation.", ko: "미래: 후속 연구 제안" },
        ],
        summary: "학술 논문에서는 현재완료로 '지금까지의 연구 동향'을, 과거완료로 '선행 연구의 시간적 선후관계'를, 미래시제로 'future research' 제안을 표현한다. 유학 에세이의 시제 선택은 논지의 시간축을 결정한다.",
        quizzes: [
          { q: "Scholars have long debated the origins of this phenomenon. 의 시제가 암시하는 것은?", opts: ["논쟁이 과거에 끝났다", "논쟁이 과거부터 지금까지 계속된다", "논쟁이 미래에 시작된다"], answer: 1, exp: "현재완료는 과거~현재까지 지속되는 상태를 나타낸다." },
          { q: "By the time the theory was formalized, earlier models had already been abandoned. 의 시간 순서는?", opts: ["abandoned가 먼저", "formalized가 먼저", "동시에 발생"], answer: 0, exp: "had been abandoned(과거완료)가 formalized(과거)보다 이전." },
          { q: "연구 제안서에서 'Future research should examine...'과 같은 표현의 시제는?", opts: ["현재완료", "미래", "과거완료"], answer: 1, exp: "미래시제로 후속 연구 방향을 제안한다." },
        ],
      },
    },
  },
  {
    id: 9,
    title: "수동태는 상태를 말한다",
    sub: '"~된", "~당한" 상태 표현',
    core: "수동태는 따로 없다. BE 동사 + 형용사일 뿐이다.",
    body: "수동태라는 용어를 버리십시오. 'The window was broken'은 창문이 깨진 상태입니다. was는 BE 동사, broken은 상태를 나타내는 형용사. Hurdle 01에서 배운 BE 동사 문장입니다. ~이다로 해석하면 됩니다.",
    levels: {
      ms: {
        examples: [
          { en: "The window was broken.", ko: "창문은 깨진 상태였다. (BE + 형용사)" },
          { en: "English is spoken in many countries.", ko: "영어는 사용되는 상태다." },
          { en: "She was surprised by the news.", ko: "그녀는 놀란 상태였다." },
        ],
        summary: "수동태 = BE 동사 + 과거분사(형용사). '~된' 상태를 표현한다.",
        quizzes: [
          { q: "The car was repaired. 를 바르게 해석하면?", opts: ["차가 고쳐지는 중이다", "차는 수리된 상태였다", "차가 고칠 것이다"], answer: 1, exp: "was(BE) + repaired(형용사) = 수리된 상태." },
          { q: "수동태의 본질은?", opts: ["특별한 문법 규칙", "BE 동사 + 과거분사(상태 표현)", "DO 동사의 변형"], answer: 1, exp: "수동태는 BE 동사 문장이다." },
          { q: "She is interested in music. 에서 interested는?", opts: ["동사", "명사", "형용사(상태)"], answer: 2, exp: "interested = 흥미를 느끼는 상태. BE 동사 뒤의 형용사." },
        ],
      },
      csat: {
        examples: [
          { en: "The findings were widely criticized by peer reviewers.", ko: "연구 결과는 널리 비판받은 상태였다." },
          { en: "The policy is often perceived as ineffective.", ko: "그 정책은 종종 비효율적으로 인식되는 상태다." },
          { en: "The manuscript was rejected due to insufficient evidence.", ko: "그 논문은 증거 부족으로 거절된 상태였다." },
        ],
        summary: "수능 지문에서 수동태는 '연구/이론/정책이 누군가에 의해 어떤 상태에 놓였다'는 학술적 뉘앙스를 만든다. by 뒤의 행위자보다 BE+형용사(과거분사)의 상태 자체에 집중하라.",
        quizzes: [
          { q: "The theory is regarded as outdated by most scholars. 를 바르게 해석하면?", opts: ["이론이 여전히 최신이다", "이론은 대부분의 학자들에게 구식으로 여겨지는 상태다", "이론을 학자들이 만들었다"], answer: 1, exp: "is regarded as = BE + 형용사(과거분사). 여겨지는 상태." },
          { q: "The results were later confirmed by independent research. 에서 confirmed의 품사적 역할은?", opts: ["동사", "형용사(상태를 나타내는 과거분사)", "명사"], answer: 1, exp: "were confirmed = BE + 형용사. 확인된 상태." },
          { q: "수동태 문장에서 by 이하가 자주 생략되는 이유는?", opts: ["문법 오류라서", "상태 자체가 중요하고 행위자는 부차적이라서", "동사가 없어서"], answer: 1, exp: "수동태의 핵심은 상태이지 행위자가 아니다." },
        ],
      },
      toeic: {
        examples: [
          { en: "The shipment was delayed due to weather conditions.", ko: "배송은 날씨로 인해 지연된 상태였다." },
          { en: "All applications are reviewed within five business days.", ko: "모든 지원서는 영업일 5일 내 검토되는 상태다." },
          { en: "The report is expected to be finalized by Friday.", ko: "보고서는 금요일까지 완료될 것으로 예상되는 상태다." },
        ],
        summary: "토익 Part 5에서는 be동사 뒤 빈칸에 능동(-ing)과 수동(p.p.) 중 하나를 고르는 문제가 자주 나온다. 주어가 '행동의 주체'인지 '상태를 받는 대상'인지로 판단하라.",
        quizzes: [
          { q: "The meeting room ___ for the client presentation. 빈칸에 알맞은 것은?", opts: ["is reserving", "is reserved", "reserves"], answer: 1, exp: "회의실은 예약'되는' 상태 = 수동(is reserved)." },
          { q: "All employees ___ to complete the survey by Monday. 빈칸에 알맞은 것은?", opts: ["are required", "require", "are requiring"], answer: 0, exp: "직원들은 요구'받는' 상태 = 수동(are required)." },
          { q: "The invoice was issued incorrectly. 를 바르게 해석하면?", opts: ["청구서가 잘못 발행하는 중이다", "청구서가 잘못 발행된 상태였다", "청구서를 곧 발행할 것이다"], answer: 1, exp: "was issued = BE + 형용사(과거분사). 발행된 상태." },
        ],
      },
      abroad: {
        examples: [
          { en: "The hypothesis was subsequently disproven by follow-up experiments.", ko: "그 가설은 후속 실험에 의해 반증된 상태였다." },
          { en: "Admission decisions are made based on a holistic review process.", ko: "입학 결정은 종합적 심사에 기반해 이루어지는 상태다." },
          { en: "The applicant's potential is often underestimated by standardized metrics.", ko: "지원자의 잠재력은 종종 표준화된 지표에 의해 과소평가되는 상태다." },
        ],
        summary: "학술 논문과 입학 에세이에서 수동태는 객관적 어조를 만든다('연구자가 증명했다'보다 '증명되었다'). 유학 에세이에서 지나친 수동태 남용은 문장을 약하게 만들 수 있으니 능동/수동을 전략적으로 선택하라.",
        quizzes: [
          { q: "The hypothesis was subsequently disproven by follow-up experiments. 를 바르게 해석하면?", opts: ["가설이 실험을 반증했다", "가설은 후속 실험에 의해 반증된 상태였다", "가설이 실험을 진행했다"], answer: 1, exp: "was disproven = BE + 형용사(과거분사). 반증된 상태." },
          { q: "학술 글쓰기에서 수동태를 쓰는 주된 이유는?", opts: ["문장을 길게 만들기 위해", "객관적이고 결과 중심적인 어조를 만들기 위해", "문법 규칙이라서 무조건 써야 해서"], answer: 1, exp: "수동태는 행위자보다 결과·상태에 초점을 맞춘 객관적 어조를 만든다." },
          { q: "Admission decisions are made based on a holistic review. 에서 made의 역할은?", opts: ["동사", "형용사(상태를 나타내는 과거분사)", "명사"], answer: 1, exp: "are made = BE + 형용사. 결정이 내려지는 상태." },
        ],
      },
    },
  },
  {
    id: 10,
    title: "문법은 매뉴얼이다",
    sub: "문장을 직접 작동시켜라",
    core: "한 번 익히면 버려도 된다. 이제 문장을 작동시켜라.",
    body: "전자제품 매뉴얼은 처음에만 봅니다. 한 번 익히면 버립니다. 영어 문법도 같습니다. 두발자전거 타기처럼, 한 번 이해하면 잊히지 않습니다. 10개의 허들을 모두 넘었다면 이제 매뉴얼은 필요 없습니다. 문장을 직접 설계하십시오.",
    levels: {
      ms: {
        examples: [
          { en: "문장 = 이다 / 하다 (Hurdle 01)", ko: "설계의 시작" },
          { en: "주어 + 동사 + 확장 (Hurdles 02~06)", ko: "구조의 완성" },
          { en: "접속·시제·수동 (Hurdles 07~09) → 작동", ko: "문장이 살아 움직인다" },
        ],
        summary: "문법은 암기가 아니다. 설계도다. 10개의 허들을 넘은 지금, 문장을 직접 만들어보자.",
        quizzes: [
          { q: "영어 문법책을 어떻게 활용해야 하는가?", opts: ["처음부터 끝까지 암기", "매뉴얼처럼 — 익히면 버린다", "매일 반복 낭독"], answer: 1, exp: "매뉴얼은 도구다. 작동법을 익히면 더 이상 필요 없다." },
          { q: "10개 허들의 핵심 메시지는?", opts: ["문법 용어를 완벽하게 외워라", "문법은 설계다 — 원리를 이해하라", "영어는 재능이다"], answer: 1, exp: "암기가 아니라 설계다." },
          { q: "모든 허들을 넘은 다음 해야 할 것은?", opts: ["문법책 다시 처음부터", "문장을 직접 만들어보기", "단어 암기"], answer: 1, exp: "이제 직접 문장을 써보고 말해봐야 한다." },
        ],
      },
      csat: {
        examples: [
          { en: "긴 지문 = 명사·형용사·부사의 확장 (Hurdles 04~06)", ko: "구조 파악의 핵심" },
          { en: "접속사 = 절의 역할 변신 (Hurdle 07)", ko: "복문 독해의 열쇠" },
          { en: "시제·수동 = 논리 흐름의 신호 (Hurdles 08~09)", ko: "지문의 시간·인과 파악" },
        ],
        summary: "수능 영어 독해는 문법 용어 암기가 아니라, 긴 문장을 구조(주어-동사-확장)로 분해하는 훈련이다. 10개 허들의 원리를 실제 기출 지문에 적용해보라.",
        quizzes: [
          { q: "긴 수능 지문을 빠르게 읽는 핵심 전략은?", opts: ["모든 단어를 사전에서 찾는다", "주어-동사부터 찾고 수식어를 구조로 분해한다", "첫 문장만 읽는다"], answer: 1, exp: "핵심 뼈대(주어-동사)를 먼저 찾으면 수식어는 자연히 정리된다." },
          { q: "10개 허들에서 배운 원리를 실전에 적용하는 방법은?", opts: ["문법 용어를 다시 암기한다", "실제 기출 지문에서 구조를 직접 분해해본다", "단어장을 새로 만든다"], answer: 1, exp: "원리는 실전 지문에 적용해봐야 완전히 내 것이 된다." },
          { q: "문법을 매뉴얼로 본다는 것의 의미는?", opts: ["평생 참고서를 들고 다닌다", "원리를 이해하면 이후엔 스스로 해석할 수 있다", "매번 처음부터 다시 배운다"], answer: 1, exp: "한 번 이해한 원리는 도구로 계속 쓸 수 있다." },
        ],
      },
      toeic: {
        examples: [
          { en: "빈칸 문제 = 동사·명사·형용사·부사 자리 판단 (Hurdles 01~06)", ko: "Part 5·6의 핵심 원리" },
          { en: "긴 지문 = 접속사로 절 역할 파악 (Hurdle 07)", ko: "Part 7 독해의 열쇠" },
          { en: "시제·수동 = 비즈니스 문서의 뉘앙스 (Hurdles 08~09)", ko: "정확한 해석의 마무리" },
        ],
        summary: "토익 만점의 비결은 문법 용어 암기가 아니라, 10개 허들의 원리를 빈칸 앞뒤 문맥에 빠르게 대입하는 훈련이다. 이제 실전 기출 문제로 이 원리를 검증해보라.",
        quizzes: [
          { q: "토익 Part 5 빈칸 문제를 빠르게 푸는 핵심은?", opts: ["모든 선택지를 해석한다", "빈칸의 자리(동사/명사/형용사/부사)를 먼저 판단한다", "가장 긴 단어를 고른다"], answer: 1, exp: "자리 판단이 먼저, 뜻 해석은 그다음이다." },
          { q: "10개 허들 원리를 토익 실전에 적용하는 다음 단계는?", opts: ["문법 용어 재암기", "실제 기출 문제에 원리를 대입해보기", "단어 무작정 암기"], answer: 1, exp: "원리는 실전 문제에 적용해야 점수로 이어진다." },
          { q: "문법을 매뉴얼로 본다는 것이 토익 학습에 주는 의미는?", opts: ["매번 규칙을 새로 외운다", "원리를 한 번 익히면 이후 스스로 빈칸을 판단할 수 있다", "규칙이 계속 바뀐다"], answer: 1, exp: "원리를 이해하면 낯선 빈칸 문제도 스스로 판단 가능하다." },
        ],
      },
      abroad: {
        examples: [
          { en: "학술 문장 = 명사절·형용사절의 정교한 확장 (Hurdles 04~07)", ko: "논문·에세이 문장력의 기초" },
          { en: "시제·수동 = 논지의 시간축과 객관적 어조 (Hurdles 08~09)", ko: "학술 글쓰기의 완성" },
          { en: "원리 → 직접 에세이·논문 문장 설계", ko: "이제 매뉴얼 없이 써 내려간다" },
        ],
        summary: "유학 에세이와 학술 논문은 결국 10개 허들의 원리(주어-동사, 명사·형용사·부사 확장, 접속사, 시제, 수동태)를 정교하게 조합하는 작업이다. 이제 원리를 직접 자신의 글에 적용해보라.",
        quizzes: [
          { q: "학술 에세이 문장력을 기르는 다음 단계는?", opts: ["문법 용어를 다시 암기한다", "원리를 자신의 실제 에세이 문장에 적용해본다", "예문을 그대로 외운다"], answer: 1, exp: "원리는 직접 써봐야 완전히 체화된다." },
          { q: "10개 허들의 원리가 유학 준비생에게 특히 중요한 이유는?", opts: ["시험 점수만을 위해서", "정교한 학술 문장을 스스로 설계할 수 있어야 하기 때문", "문법 용어 시험이 있어서"], answer: 1, exp: "에세이·논문은 스스로 문장을 설계하는 능력을 요구한다." },
          { q: "문법을 매뉴얼로 본다는 것이 학술 글쓰기에 주는 의미는?", opts: ["규칙을 평생 참고해야 한다", "원리를 이해하면 이후엔 스스로 정교한 문장을 만들 수 있다", "매번 원어민 첨삭이 필요하다"], answer: 1, exp: "원리를 체화하면 스스로 학술적 문장을 설계할 수 있다." },
        ],
      },
    },
  },
];
