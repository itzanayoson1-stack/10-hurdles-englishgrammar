export const HURDLES = [
  {
    id: 1,
    title: "문장은 딱 두 종류다",
    sub: "~이다 vs ~하다",
    core: "영어 문장은 결국 BE 동사와 DO 동사, 두 종류에서 시작된다.",
    body: "영문법 책을 펴면 1형식부터 5형식까지 쏟아집니다. 하지만 한국말로 생각해보면 단순합니다. 문장은 딱 두 종류입니다. 상태나 존재를 말하는 문장(~이다)과 동작이나 행위를 말하는 문장(~하다). 영어도 똑같습니다.",
    examples: [
      { en: "I am a student.", ko: "나는 학생이다. → BE 동사" },
      { en: "She is happy.", ko: "그녀는 행복하다. → BE 동사" },
      { en: "He studies English.", ko: "그는 영어를 공부한다. → DO 동사" }
    ],
    summary: "BE 동사 = ~이다, ~하다(상태) | DO 동사 = 행동하다, 움직이다. 세상의 모든 영어 문장은 이 두 틀 안에 들어갑니다.",
    quizzes: [
      { q: "다음 중 BE 동사 문장은?", opts: ["I am tired.", "She runs every day.", "He works at a bank."], answer: 0, exp: "I am tired = 나는 피곤하다(상태). am이 BE 동사입니다." },
      { q: "They are friends. 이 문장의 동사 종류는?", opts: ["DO 동사", "BE 동사", "둘 다"], answer: 1, exp: "are는 BE 동사입니다. ~이다로 해석됩니다." },
      { q: "She works at a bank. 이 문장은?", opts: ["BE 동사 문장", "DO 동사 문장", "판단 불가"], answer: 1, exp: "works는 DO 동사입니다. 행동을 나타냅니다." }
    ]
  },
  {
    id: 2,
    title: "주어와 목적어는 문장의 축",
    sub: "JECT — 공간에 던져진 것",
    core: "주어는 내 안에서 꺼낸 것. 목적어는 눈앞에 놓인 것.",
    body: "SUBJECT의 SUB는 '아래에서'입니다. 내 마음속에서 끌어올려 던진 것이 주어입니다. OBJECT의 OB는 '바로 앞에'입니다. 눈앞에 뚜렷하게 놓인 것이 목적어입니다. JECT는 공간에 던져진 모든 것이며, 단어→구→절로 무한 확장됩니다.",
    examples: [
      { en: "She loves coffee.", ko: "그녀(주어)가 커피(목적어)를 사랑한다." },
      { en: "The dog bit the man.", ko: "개(주어)가 남자(목적어)를 물었다." },
      { en: "I understand the rule that she explained.", ko: "절(문장 전체)이 목적어 자리에 들어간 예시" }
    ],
    summary: "주어(SUBJECT): 내 안에서 나온 것 | 목적어(OBJECT): 동사의 에너지를 받는 대상. 둘 다 JECT — 단어, 구, 절 모두 가능합니다.",
    quizzes: [
      { q: "She loves music. 에서 목적어는?", opts: ["She", "loves", "music"], answer: 2, exp: "music이 동사 loves의 에너지를 받는 목적어입니다." },
      { q: "주어에 대한 설명으로 맞는 것은?", opts: ["눈앞에 보이는 것", "말하는 사람 내면에서 나온 것", "항상 명사 한 단어"], answer: 1, exp: "SUB = 아래에서. 말하는 사람의 내면에서 끌어올린 것이 주어입니다." },
      { q: "I know what she said. 에서 목적어는?", opts: ["I", "know", "what she said"], answer: 2, exp: "what she said(절 전체)가 목적어 자리에 들어갔습니다." }
    ]
  },
  {
    id: 3,
    title: "동사가 문장의 엔진이다",
    sub: "동사를 잡으면 문장이 보인다",
    core: "엔진 없는 차는 고철이다. 동사 없는 문장은 존재하지 않는다.",
    body: "긴 영어 문장을 만났을 때 어디서부터 읽어야 할지 모르겠다면 동사를 먼저 찾으십시오. BE 동사는 등호(=)입니다. 주어와 뒤의 말을 같다고 연결합니다. DO 동사는 화살표(→)입니다. 주어의 에너지가 목적어를 향해 쏘아집니다.",
    examples: [
      { en: "She is a doctor.", ko: "그녀 = 의사. BE 동사는 등호(=)" },
      { en: "She treats patients.", ko: "그녀 → 환자들. DO 동사는 화살표(→)" },
      { en: "The tall man in the black suit runs.", ko: "길어도 엔진은 runs 하나" }
    ],
    summary: "BE 동사: 주어 = 보어 | DO 동사: 주어 → 목적어. 동사는 시간도 담습니다. 동사가 바뀌면 시간이 바뀝니다.",
    quizzes: [
      { q: "She is a doctor. 에서 동사의 역할은?", opts: ["화살표(→)", "등호(=)", "시간 표현"], answer: 1, exp: "is는 BE 동사 = 등호입니다. 그녀 = 의사를 연결합니다." },
      { q: "긴 문장에서 동사를 먼저 찾는 이유는?", opts: ["문장이 짧아 보여서", "동사가 문장의 엔진이기 때문", "문법 규칙이라서"], answer: 1, exp: "동사를 찾으면 문장 전체 구조가 보입니다." },
      { q: "He worked hard yesterday. 에서 시간을 나타내는 것은?", opts: ["He", "worked", "hard"], answer: 1, exp: "worked(과거형)가 시간을 담습니다." }
    ]
  },
  {
    id: 4,
    title: "명사는 단어가 아니다",
    sub: "단어→구→절, 땅에서 우주까지",
    core: "명사를 단어 하나로만 보는 순간 영어 문장의 절반이 안 보인다.",
    body: "명사는 무한히 확장됩니다. 단어(땅) → 구(하늘) → 절(우주). 긴 영어 문장이 무서운 이유는 명사가 덩어리로 움직이기 때문입니다. 명사는 문장 안에서 세 자리에만 앉습니다: 주어 자리, 목적어 자리, 보어 자리.",
    examples: [
      { en: "friend / an old friend / a friend I've known since school", ko: "친구(단어) → 오랜 친구(구) → 학교부터 알아온 친구(절)" },
      { en: "What he said surprised me.", ko: "What he said(절 전체)가 주어 자리에" },
      { en: "I know that she is right.", ko: "that she is right(절)가 목적어 자리에" }
    ],
    summary: "명사 단어(땅) | 명사구(하늘) | 명사절(우주). 문장이 통째로 명사가 됩니다. 명사는 우주입니다.",
    quizzes: [
      { q: "What she said was important. 에서 주어는?", opts: ["What", "she", "What she said"], answer: 2, exp: "What she said(절 전체)가 주어 자리에 들어갔습니다." },
      { q: "명사가 앉을 수 없는 자리는?", opts: ["주어 자리", "동사 자리", "목적어 자리"], answer: 1, exp: "명사는 주어, 목적어, 보어 자리에 앉습니다. 동사 자리에는 동사만 옵니다." },
      { q: "'a friend I've known for 10 years'는?", opts: ["명사 단어", "명사구", "명사절"], answer: 1, exp: "두 개 이상의 단어로 이루어진 명사 덩어리 = 명사구입니다." }
    ]
  },
  {
    id: 5,
    title: "형용사는 하나다",
    sub: "분사·관계사절, 전부 명사를 꾸민다",
    core: "이름이 달라도 하는 일은 하나. 명사를 꾸며준다.",
    body: "현재분사, 과거분사, 분사구문, 관계사절... 전부 명사를 꾸며주는 형용사입니다. 단어→구→절로 확장되는 것도 명사와 같습니다. 명사 뒤에 뭔가 길게 붙어있으면 그게 전부 그 명사를 꾸며주는 형용사입니다.",
    examples: [
      { en: "a broken window", ko: "broken(과거분사)이 명사를 꾸밈 = 형용사 단어" },
      { en: "a window broken by the storm", ko: "broken by the storm = 형용사구" },
      { en: "a window that the storm broke", ko: "that the storm broke = 관계사절 = 형용사절" }
    ],
    summary: "형용사 단어: 분사(현재/과거) | 형용사구: 분사구문 | 형용사절: 관계사절. 이름이 셋, 하는 일은 하나 — 명사를 꾸며줍니다.",
    quizzes: [
      { q: "The girl running in the park is my sister. 에서 'running in the park'의 역할은?", opts: ["동사", "명사를 꾸미는 형용사구", "부사"], answer: 1, exp: "running in the park는 girl(명사)을 꾸미는 형용사구입니다." },
      { q: "관계사절(who, which, that + 절)의 역할은?", opts: ["명사", "명사를 꾸미는 형용사절", "부사절"], answer: 1, exp: "관계사절은 앞의 명사(선행사)를 꾸며주는 형용사절입니다." },
      { q: "형용사의 공통 역할은?", opts: ["동사를 꾸민다", "명사를 꾸민다", "문장을 연결한다"], answer: 1, exp: "단어든 구든 절이든, 명사를 꾸며주면 전부 형용사입니다." }
    ]
  },
  {
    id: 6,
    title: "부사도 하나다",
    sub: "언제, 어디서, 어떻게, 왜",
    core: "명사 빼고 다 꾸며주는 것. 그게 부사다.",
    body: "부사는 동사를 꾸미고, 형용사를 꾸미고, 문장 전체를 꾸밉니다. 형용사와 다른 점은 위치가 자유롭습니다. 앞에 와도, 뒤에 와도, 중간에 와도 됩니다. 부사절 — 조건절, 이유절, 결과절, 양보절 — 전부 부사입니다.",
    examples: [
      { en: "She runs fast.", ko: "fast(부사 단어)가 동사 runs를 꾸밈" },
      { en: "She speaks in a soft voice.", ko: "in a soft voice(부사구)가 동사를 꾸밈" },
      { en: "She speaks so that everyone can understand.", ko: "절 전체가 부사절로 동사를 꾸밈" }
    ],
    summary: "부사 단어: fast, hard | 부사구: in the morning | 부사절: because, when, if, so that. 명사 빼고 다 꾸밉니다.",
    quizzes: [
      { q: "She is very tall. 에서 very의 역할은?", opts: ["동사를 꾸민다", "형용사를 꾸민다", "명사를 꾸민다"], answer: 1, exp: "very는 형용사 tall을 꾸미는 부사입니다." },
      { q: "Because it was raining, I stayed home. 에서 Because절의 역할은?", opts: ["명사절", "형용사절", "부사절"], answer: 2, exp: "이유를 나타내는 Because절은 부사절입니다." },
      { q: "부사의 특권은?", opts: ["명사 자리에만 올 수 있다", "위치가 비교적 자유롭다", "반드시 동사 뒤에 온다"], answer: 1, exp: "부사는 앞, 중간, 뒤 어디에 와도 됩니다." }
    ]
  },
  {
    id: 7,
    title: "접속사는 문장을 변신시킨다",
    sub: "명사절·형용사절·부사절 접속사",
    core: "접속사는 문장을 명사, 형용사, 부사로 변신시키는 도구다.",
    body: "접속사는 어렵지 않습니다. 문장을 하나의 덩어리로 만들어서 명사, 형용사, 부사로 변신시키는 것이 전부입니다. 명사로 만들면 명사절 접속사, 형용사로 만들면 형용사절 접속사, 부사로 만들면 부사절 접속사입니다.",
    examples: [
      { en: "I know that she is smart.", ko: "that = 명사절 접속사 (절을 목적어로)" },
      { en: "The book that I read was great.", ko: "that = 형용사절 접속사 (book을 꾸밈)" },
      { en: "If it rains, I'll stay home.", ko: "if = 부사절 접속사 (조건)" }
    ],
    summary: "명사절 접속사: that, what, whether | 형용사절: who, which, that | 부사절: if, because, when, although. 변신의 목적지가 다릅니다.",
    quizzes: [
      { q: "I believe that he is honest. 에서 that의 역할은?", opts: ["형용사절 접속사", "명사절 접속사", "부사절 접속사"], answer: 1, exp: "that he is honest는 believe의 목적어(명사)가 된 명사절입니다." },
      { q: "The man who called you is here. 에서 who의 역할은?", opts: ["명사절 접속사", "형용사절 접속사", "부사절 접속사"], answer: 1, exp: "who called you는 man(명사)을 꾸미는 형용사절입니다." },
      { q: "Although she was tired, she kept working. 에서 Although는?", opts: ["명사절 접속사", "형용사절 접속사", "부사절 접속사(양보)"], answer: 2, exp: "Although = 비록 ~이지만. 부사절로 주절을 꾸밉니다." }
    ]
  },
  {
    id: 8,
    title: "시제는 시간의 좌표다",
    sub: "동사는 시간 위에 놓인다",
    core: "시간은 돌아오지 않는다. 동사가 그 좌표를 표시한다.",
    body: "시간은 원이 아닙니다. 직선입니다. 불 붙은 양초처럼 타서 날아갑니다. 동사는 그 직선 위의 좌표를 표시합니다. 현재, 과거, 미래. 그리고 완료형은 과거의 어느 시점과 현재를 연결합니다.",
    examples: [
      { en: "She is / was / will be a doctor.", ko: "동사가 바뀌면 시간이 바뀐다" },
      { en: "I have lived here for 10 years.", ko: "현재완료: 과거부터 지금까지 연결" },
      { en: "When I arrived, she had already left.", ko: "과거완료: 과거보다 더 이전" }
    ],
    summary: "현재: am/is/are | 과거: was/were, 동사ed | 현재완료: have/has + p.p. 시간의 좌표를 동사로 표시합니다.",
    quizzes: [
      { q: "I have studied English for 5 years. 의 시제는?", opts: ["과거", "현재완료", "미래"], answer: 1, exp: "have + studied(p.p.) = 현재완료. 5년 전부터 지금까지를 나타냅니다." },
      { q: "시제가 중요한 이유는?", opts: ["문법 점수를 위해", "동사가 시간 좌표를 표시하기 때문", "원어민처럼 보이려고"], answer: 1, exp: "동사가 바뀌면 시간이 바뀝니다. 시제는 시간의 GPS입니다." },
      { q: "When she arrived, he had already left. 에서 had left는?", opts: ["현재완료", "과거완료", "단순과거"], answer: 1, exp: "had + left(p.p.) = 과거완료. arrived보다 더 이전에 떠났음을 표시합니다." }
    ]
  },
  {
    id: 9,
    title: "수동태는 상태를 말한다",
    sub: '"~된", "~당한" 상태 표현',
    core: "수동태는 따로 없다. BE 동사 + 형용사일 뿐이다.",
    body: "수동태라는 용어를 버리십시오. 'The window was broken'은 창문이 깨진 상태입니다. was는 BE 동사, broken은 상태를 나타내는 형용사. Hurdle 01에서 배운 BE 동사 문장입니다. ~이다로 해석하면 됩니다.",
    examples: [
      { en: "The window was broken.", ko: "창문은 깨진 상태였다. (BE + 형용사)" },
      { en: "English is spoken all over the world.", ko: "영어는 전 세계에서 사용되는 상태다." },
      { en: "She was surprised by the news.", ko: "그녀는 뉴스에 의해 놀란 상태였다." }
    ],
    summary: "수동태 = BE 동사 + 과거분사(형용사). '~된', '~당한' 상태를 표현합니다. BE 동사 문장으로 이해하십시오.",
    quizzes: [
      { q: "The car was repaired. 를 바르게 해석하면?", opts: ["차가 고쳐지는 중이다", "차는 수리된 상태였다", "차가 고칠 것이다"], answer: 1, exp: "was(BE) + repaired(형용사). 수리된 상태. BE 동사 문장입니다." },
      { q: "수동태의 본질은?", opts: ["특별한 문법 규칙", "BE 동사 + 과거분사(상태 표현)", "DO 동사의 변형"], answer: 1, exp: "수동태는 BE 동사 + 형용사(과거분사)로 상태를 표현하는 것입니다." },
      { q: "She is interested in English. 에서 interested는?", opts: ["동사", "명사", "형용사(수동 의미)"], answer: 2, exp: "interested = 흥미를 느끼는 상태. BE 동사 뒤의 형용사입니다." }
    ]
  },
  {
    id: 10,
    title: "문법은 매뉴얼이다",
    sub: "문장을 직접 작동시켜라",
    core: "한 번 익히면 버려도 된다. 이제 문장을 작동시켜라.",
    body: "전자제품 매뉴얼은 처음에만 봅니다. 한 번 익히면 버립니다. 영어 문법도 같습니다. 두발자전거 타기처럼, 한 번 이해하면 잊히지 않습니다. 10개의 허들을 모두 넘었다면 이제 매뉴얼은 필요 없습니다. 문장을 직접 설계하십시오.",
    examples: [
      { en: "문장 = 이다 / 하다 (Hurdle 01)", ko: "설계의 시작" },
      { en: "JECT + 동사 + 확장 (Hurdles 02~06)", ko: "구조의 완성" },
      { en: "접속·시제·수동 (Hurdles 07~09) → 작동", ko: "문장이 살아 움직인다" }
    ],
    summary: "문법은 암기가 아닙니다. 설계도입니다. 10개의 허들을 넘은 당신은 이제 매뉴얼 없이 문장을 작동시킬 수 있습니다.",
    quizzes: [
      { q: "영어 문법책을 어떻게 활용해야 하는가?", opts: ["처음부터 끝까지 암기", "전자제품 매뉴얼처럼 — 익히면 버린다", "매일 반복 낭독"], answer: 1, exp: "매뉴얼은 도구입니다. 작동법을 익히면 더 이상 필요하지 않습니다." },
      { q: "10개 허들의 핵심 메시지는?", opts: ["문법 용어를 완벽하게 외워라", "문법은 설계다 — 작동 원리를 이해하라", "영어는 재능이다"], answer: 1, exp: "암기가 아니라 설계입니다. 원리를 이해하면 모든 문장이 설계 가능합니다." },
      { q: "모든 허들을 넘은 다음 해야 할 것은?", opts: ["문법책 다시 처음부터", "문장을 직접 작동시키기", "단어 암기"], answer: 1, exp: "설계도를 익혔으면 이제 직접 지어야 합니다. 문장을 만들고, 쓰고, 말하십시오." }
    ]
  }
]
