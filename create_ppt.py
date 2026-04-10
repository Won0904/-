from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.util import Inches, Pt
import copy

# Colors
YELLOW = RGBColor(0xFF, 0xD7, 0x00)       # Beoltoon yellow
BLACK = RGBColor(0x1A, 0x1A, 0x1A)        # Deep black
WHITE = RGBColor(0xFF, 0xFF, 0xFF)         # White
DARK_YELLOW = RGBColor(0xE5, 0xC2, 0x00)  # Darker yellow accent
GRAY = RGBColor(0x3D, 0x3D, 0x3D)         # Dark gray
LIGHT_GRAY = RGBColor(0xF5, 0xF5, 0xF5)   # Light gray
ACCENT_RED = RGBColor(0xFF, 0x4D, 0x4D)   # Accent red for highlights

prs = Presentation()
prs.slide_width = Inches(13.33)
prs.slide_height = Inches(7.5)

SLIDE_W = prs.slide_width
SLIDE_H = prs.slide_height

def add_rect(slide, x, y, w, h, fill_color=None, line_color=None, line_width=None):
    shape = slide.shapes.add_shape(1, x, y, w, h)  # MSO_SHAPE_TYPE.RECTANGLE = 1
    if fill_color:
        shape.fill.solid()
        shape.fill.fore_color.rgb = fill_color
    else:
        shape.fill.background()
    if line_color:
        shape.line.color.rgb = line_color
        if line_width:
            shape.line.width = line_width
    else:
        shape.line.fill.background()
    return shape

def add_textbox(slide, text, x, y, w, h, font_size=18, bold=False, color=WHITE,
                align=PP_ALIGN.LEFT, font_name="맑은 고딕", wrap=True, line_spacing=None):
    txBox = slide.shapes.add_textbox(x, y, w, h)
    tf = txBox.text_frame
    tf.word_wrap = wrap
    p = tf.paragraphs[0]
    p.alignment = align
    if line_spacing:
        p.line_spacing = line_spacing
    run = p.add_run()
    run.text = text
    run.font.size = Pt(font_size)
    run.font.bold = bold
    run.font.color.rgb = color
    run.font.name = font_name
    return txBox

def add_text_in_rect(slide, text, x, y, w, h, fill_color, font_size=18, bold=False,
                     text_color=WHITE, align=PP_ALIGN.CENTER, font_name="맑은 고딕"):
    shape = add_rect(slide, x, y, w, h, fill_color=fill_color)
    tf = shape.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.size = Pt(font_size)
    run.font.bold = bold
    run.font.color.rgb = text_color
    run.font.name = font_name
    return shape


# ============================================================
# SLIDE 1: Title Slide
# ============================================================
slide_layout = prs.slide_layouts[6]  # blank
slide = prs.slides.add_slide(slide_layout)

# Full black background
add_rect(slide, 0, 0, SLIDE_W, SLIDE_H, fill_color=BLACK)

# Yellow accent bar left
add_rect(slide, 0, 0, Inches(0.6), SLIDE_H, fill_color=YELLOW)

# Yellow accent bar bottom
add_rect(slide, 0, SLIDE_H - Inches(0.12), SLIDE_W, Inches(0.12), fill_color=YELLOW)

# Main title
add_textbox(slide, "벌툰 SNS 채널 운영 기획안",
            Inches(1.1), Inches(1.8), Inches(10), Inches(1.2),
            font_size=44, bold=True, color=YELLOW, align=PP_ALIGN.LEFT)

# Subtitle
add_textbox(slide, "📱 3-Line 세그먼트 전략",
            Inches(1.1), Inches(3.1), Inches(10), Inches(0.7),
            font_size=26, bold=False, color=WHITE, align=PP_ALIGN.LEFT)

# Description
add_textbox(slide, '"브랜딩으로 유입을 만들고, 중앙 라인에서 창업으로 전환시키는 자동화 구조"',
            Inches(1.1), Inches(3.9), Inches(10.5), Inches(0.8),
            font_size=17, bold=False, color=RGBColor(0xCC, 0xCC, 0xCC), align=PP_ALIGN.LEFT)

# Bottom tag
add_textbox(slide, "벌툰 프랜차이즈  |  SNS 마케팅 전략  |  2026",
            Inches(1.1), Inches(6.5), Inches(8), Inches(0.5),
            font_size=12, color=RGBColor(0x88, 0x88, 0x88), align=PP_ALIGN.LEFT)


# ============================================================
# SLIDE 2: Contents
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])

add_rect(slide, 0, 0, SLIDE_W, SLIDE_H, fill_color=BLACK)
add_rect(slide, 0, 0, Inches(0.6), SLIDE_H, fill_color=YELLOW)
add_rect(slide, 0, SLIDE_H - Inches(0.12), SLIDE_W, Inches(0.12), fill_color=YELLOW)

add_textbox(slide, "CONTENTS", Inches(1.1), Inches(0.4), Inches(10), Inches(0.6),
            font_size=13, color=YELLOW, align=PP_ALIGN.LEFT)
add_textbox(slide, "목차",
            Inches(1.1), Inches(0.9), Inches(10), Inches(0.8),
            font_size=36, bold=True, color=WHITE, align=PP_ALIGN.LEFT)

items = [
    ("01", "전략 개요", "3-Line 세그먼트 전략 핵심 구조"),
    ("02", "피드 레이아웃 설계", "콘텐츠 역할 분리 (Layout)"),
    ("03", "브랜딩 콘텐츠 전략", "왼쪽/오른쪽 — 노란색 톤앤매너"),
    ("04", "창업 콘텐츠 전략", "가운데 — 창업 전환 포맷"),
    ("05", "채택해야 하는 이유", "알고리즘·시각·전환 3대 근거"),
    ("06", "최종 기대효과", "자동화 창업 전환 깔때기"),
]

for i, (num, title, desc) in enumerate(items):
    y = Inches(1.9) + i * Inches(0.78)
    add_rect(slide, Inches(1.1), y, Inches(0.7), Inches(0.55), fill_color=YELLOW)
    add_textbox(slide, num, Inches(1.1), y + Pt(4), Inches(0.7), Inches(0.5),
                font_size=18, bold=True, color=BLACK, align=PP_ALIGN.CENTER)
    add_textbox(slide, title, Inches(2.0), y, Inches(4.5), Inches(0.55),
                font_size=17, bold=True, color=WHITE, align=PP_ALIGN.LEFT)
    add_textbox(slide, desc, Inches(6.6), y, Inches(5.8), Inches(0.55),
                font_size=13, color=RGBColor(0xAA, 0xAA, 0xAA), align=PP_ALIGN.LEFT)


# ============================================================
# SLIDE 3: Strategy Overview
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_rect(slide, 0, 0, SLIDE_W, SLIDE_H, fill_color=BLACK)
add_rect(slide, 0, 0, SLIDE_W, Inches(1.5), fill_color=RGBColor(0x22, 0x22, 0x22))
add_rect(slide, 0, Inches(1.5) - Inches(0.06), SLIDE_W, Inches(0.06), fill_color=YELLOW)

add_textbox(slide, "01  전략 개요", Inches(0.5), Inches(0.2), Inches(10), Inches(0.5),
            font_size=13, color=YELLOW)
add_textbox(slide, "3-Line 세그먼트 전략",
            Inches(0.5), Inches(0.65), Inches(12), Inches(0.75),
            font_size=32, bold=True, color=WHITE)

# Three columns
col_w = Inches(3.8)
col_h = Inches(4.8)
cols = [
    (Inches(0.4), YELLOW, BLACK, "LEFT\nBRANDING", "브랜딩 콘텐츠\n(노란색 톤앤매너)", "공감 밈 · 상황극 · 고객 시점\n\n가볍고 재미있는 콘텐츠로\n자연스러운 유입 창출"),
    (Inches(4.7), BLACK, YELLOW, "CENTER\nCONVERSION", "창업 전환 콘텐츠\n(검정색 포맷)", "자극적 카피 · 매장 영상\n보조 메시지\n\n창업 문의로 직결되는\n전환 중심 구조"),
    (Inches(9.0), YELLOW, BLACK, "RIGHT\nBRANDING", "브랜딩 콘텐츠\n(노란색 톤앤매너)", "공감 밈 · 상황극 · 고객 시점\n\n가볍고 재미있는 콘텐츠로\n자연스러운 유입 창출"),
]

for x, bg, fg, tag, title, body in cols:
    add_rect(slide, x, Inches(1.65), col_w, col_h, fill_color=bg)
    add_text_in_rect(slide, tag, x, Inches(1.65), col_w, Inches(1.0),
                     fill_color=fg if bg == YELLOW else YELLOW,
                     font_size=15, bold=True, text_color=BLACK if fg != BLACK else WHITE)
    add_textbox(slide, title, x + Inches(0.15), Inches(2.8), col_w - Inches(0.3), Inches(0.8),
                font_size=14, bold=True,
                color=BLACK if bg == YELLOW else WHITE, align=PP_ALIGN.CENTER)
    add_textbox(slide, body, x + Inches(0.15), Inches(3.7), col_w - Inches(0.3), Inches(2.5),
                font_size=12,
                color=BLACK if bg == YELLOW else RGBColor(0xCC, 0xCC, 0xCC), align=PP_ALIGN.CENTER)

# Arrow
add_textbox(slide, "→", Inches(4.2), Inches(3.8), Inches(0.45), Inches(0.5),
            font_size=24, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
add_textbox(slide, "→", Inches(8.55), Inches(3.8), Inches(0.45), Inches(0.5),
            font_size=24, bold=True, color=WHITE, align=PP_ALIGN.CENTER)

add_textbox(slide, "유입 → 창업 전환 → 유입의 반복 자동화 구조",
            Inches(0.5), Inches(6.65), Inches(12), Inches(0.5),
            font_size=13, color=YELLOW, align=PP_ALIGN.CENTER)


# ============================================================
# SLIDE 4: Feed Layout
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_rect(slide, 0, 0, SLIDE_W, SLIDE_H, fill_color=RGBColor(0x10, 0x10, 0x10))
add_rect(slide, 0, 0, SLIDE_W, Inches(1.5), fill_color=RGBColor(0x22, 0x22, 0x22))
add_rect(slide, 0, Inches(1.5) - Inches(0.06), SLIDE_W, Inches(0.06), fill_color=YELLOW)

add_textbox(slide, "02  피드 레이아웃 설계", Inches(0.5), Inches(0.2), Inches(10), Inches(0.5),
            font_size=13, color=YELLOW)
add_textbox(slide, "콘텐츠 역할 분리 (Layout)",
            Inches(0.5), Inches(0.65), Inches(12), Inches(0.75),
            font_size=32, bold=True, color=WHITE)

# Simulated feed grid
cell_w = Inches(1.35)
cell_h = Inches(1.45)
grid_start_x = Inches(2.0)
grid_start_y = Inches(1.7)
gap = Inches(0.08)

# 3 cols x 3 rows
patterns = [
    [YELLOW, BLACK, YELLOW],
    [YELLOW, BLACK, YELLOW],
    [YELLOW, BLACK, YELLOW],
]

labels_col = ["L", "C", "R"]
labels_role = ["브랜딩", "창업", "브랜딩"]

for row in range(3):
    for col in range(3):
        x = grid_start_x + col * (cell_w + gap)
        y = grid_start_y + row * (cell_h + gap)
        color = patterns[row][col]
        add_rect(slide, x, y, cell_w, cell_h, fill_color=color)
        if color == YELLOW:
            add_textbox(slide, "🟡 브랜딩", x, y + Inches(0.5), cell_w, Inches(0.5),
                        font_size=11, bold=True, color=BLACK, align=PP_ALIGN.CENTER)
        else:
            add_textbox(slide, "⬛ 창업", x, y + Inches(0.5), cell_w, Inches(0.5),
                        font_size=11, bold=True, color=YELLOW, align=PP_ALIGN.CENTER)

# Column labels
for col, (lbl, role) in enumerate(zip(labels_col, labels_role)):
    x = grid_start_x + col * (cell_w + gap)
    add_textbox(slide, f"[ {role} ]", x, grid_start_y - Inches(0.38), cell_w, Inches(0.35),
                font_size=12, bold=True,
                color=YELLOW if role == "창업" else WHITE, align=PP_ALIGN.CENTER)

# Right side explanation
rx = Inches(7.5)
add_textbox(slide, "피드 구성 원칙", rx, Inches(1.7), Inches(5.3), Inches(0.5),
            font_size=18, bold=True, color=YELLOW)

rules = [
    ("벌툰 노란색 톤앤매너 유지", "브랜딩 라인 전체에 통일된 노란색 컬러 적용"),
    ("중앙 라인 검정 포맷 고정", "창업 콘텐츠는 상단·하단 검정 바 + 중앙 영상"),
    ("3열 교차 배치", "L-브랜딩 / C-창업 / R-브랜딩 의 반복 구조"),
    ("Ad Fatigue 방지", "동일 썸네일 반복 지양, 시각 다양성 확보"),
]
for i, (title, desc) in enumerate(rules):
    y = Inches(2.4) + i * Inches(1.0)
    add_rect(slide, rx, y, Inches(0.06), Inches(0.7), fill_color=YELLOW)
    add_textbox(slide, title, rx + Inches(0.2), y, Inches(5.0), Inches(0.38),
                font_size=14, bold=True, color=WHITE)
    add_textbox(slide, desc, rx + Inches(0.2), y + Inches(0.38), Inches(5.0), Inches(0.38),
                font_size=11, color=RGBColor(0xAA, 0xAA, 0xAA))


# ============================================================
# SLIDE 5: Branding Content
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_rect(slide, 0, 0, SLIDE_W, SLIDE_H, fill_color=BLACK)
add_rect(slide, 0, 0, SLIDE_W, Inches(1.5), fill_color=RGBColor(0x22, 0x22, 0x22))
add_rect(slide, 0, Inches(1.5) - Inches(0.06), SLIDE_W, Inches(0.06), fill_color=YELLOW)

add_textbox(slide, "03  브랜딩 콘텐츠 전략", Inches(0.5), Inches(0.2), Inches(10), Inches(0.5),
            font_size=13, color=YELLOW)
add_textbox(slide, "왼쪽 / 오른쪽 라인  —  노란색 톤앤매너",
            Inches(0.5), Inches(0.65), Inches(12), Inches(0.75),
            font_size=28, bold=True, color=WHITE)

types = [
    ("유형 1", "공감 밈", YELLOW,
     ["벌툰 가면 생기는 일", "이거 공감하면 단골임"],
     "텍스트 중심 · 가볍고 밈 느낌 · 광고 느낌 0"),
    ("유형 2", "상황극 대화", YELLOW,
     ['"야 너 또 왔냐"', '"나 여기 거의 세입자임"'],
     "캐릭터 대화 형식 · 기영이 스타일 · 공감 극대화"),
    ("유형 3", "고객 시점", YELLOW,
     ["혼자 시간 보내기 최고인 이유", "집보다 편한 곳"],
     "실제 고객 감성 · 1인칭 시점 · 자연스러운 공감"),
]

col_w = Inches(3.8)
for i, (num, name, color, examples, point) in enumerate(types):
    x = Inches(0.4) + i * Inches(4.3)
    y = Inches(1.7)
    # Card background
    add_rect(slide, x, y, col_w, Inches(5.2), fill_color=RGBColor(0x22, 0x22, 0x22))
    add_rect(slide, x, y, col_w, Inches(0.06), fill_color=YELLOW)
    # Header
    add_text_in_rect(slide, f"✔️  {num}\n{name}", x, y + Inches(0.06), col_w, Inches(1.0),
                     fill_color=YELLOW, font_size=15, bold=True, text_color=BLACK)
    # Examples
    for j, ex in enumerate(examples):
        ey = y + Inches(1.3) + j * Inches(0.65)
        add_rect(slide, x + Inches(0.2), ey, col_w - Inches(0.4), Inches(0.55),
                 fill_color=RGBColor(0x33, 0x33, 0x33))
        add_textbox(slide, f'"{ex}"', x + Inches(0.3), ey + Inches(0.06),
                    col_w - Inches(0.5), Inches(0.45),
                    font_size=12, color=WHITE, align=PP_ALIGN.LEFT)
    # Point
    add_rect(slide, x + Inches(0.2), y + Inches(2.75), col_w - Inches(0.4), Inches(0.06),
             fill_color=YELLOW)
    add_textbox(slide, "👉 포인트", x + Inches(0.2), y + Inches(2.9), col_w - Inches(0.3),
                Inches(0.35), font_size=12, bold=True, color=YELLOW)
    add_textbox(slide, point, x + Inches(0.2), y + Inches(3.3), col_w - Inches(0.3),
                Inches(1.7), font_size=11, color=RGBColor(0xCC, 0xCC, 0xCC))


# ============================================================
# SLIDE 6: Startup Content
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_rect(slide, 0, 0, SLIDE_W, SLIDE_H, fill_color=BLACK)
add_rect(slide, 0, 0, SLIDE_W, Inches(1.5), fill_color=RGBColor(0x22, 0x22, 0x22))
add_rect(slide, 0, Inches(1.5) - Inches(0.06), SLIDE_W, Inches(0.06), fill_color=YELLOW)

add_textbox(slide, "04  창업 콘텐츠 전략", Inches(0.5), Inches(0.2), Inches(10), Inches(0.5),
            font_size=13, color=YELLOW)
add_textbox(slide, "가운데 라인  —  창업 전환 포맷",
            Inches(0.5), Inches(0.65), Inches(12), Inches(0.75),
            font_size=28, bold=True, color=WHITE)

# Phone mockup (simplified)
phone_x = Inches(0.7)
phone_y = Inches(1.7)
phone_w = Inches(3.2)
phone_h = Inches(5.3)

add_rect(slide, phone_x, phone_y, phone_w, phone_h, fill_color=RGBColor(0x22, 0x22, 0x22),
         line_color=YELLOW, line_width=Pt(2))
# Top black bar
add_rect(slide, phone_x + Inches(0.1), phone_y + Inches(0.1),
         phone_w - Inches(0.2), Inches(1.3), fill_color=BLACK)
add_textbox(slide, "자극 카피", phone_x + Inches(0.1), phone_y + Inches(0.1),
            phone_w - Inches(0.2), Inches(1.3),
            font_size=13, bold=True, color=YELLOW, align=PP_ALIGN.CENTER)
# Center video area
add_rect(slide, phone_x + Inches(0.1), phone_y + Inches(1.5),
         phone_w - Inches(0.2), Inches(2.3), fill_color=RGBColor(0x33, 0x33, 0x33))
add_textbox(slide, "▶  매장 영상", phone_x + Inches(0.1), phone_y + Inches(2.3),
            phone_w - Inches(0.2), Inches(0.6),
            font_size=13, color=RGBColor(0x88, 0x88, 0x88), align=PP_ALIGN.CENTER)
# Bottom black bar
add_rect(slide, phone_x + Inches(0.1), phone_y + Inches(3.9),
         phone_w - Inches(0.2), Inches(1.3), fill_color=BLACK)
add_textbox(slide, "보조 메시지", phone_x + Inches(0.1), phone_y + Inches(3.9),
            phone_w - Inches(0.2), Inches(1.3),
            font_size=13, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
add_textbox(slide, "포맷 구조", phone_x, phone_y + phone_h + Inches(0.1),
            phone_w, Inches(0.35), font_size=11, color=RGBColor(0x88, 0x88, 0x88), align=PP_ALIGN.CENTER)

# Right side: content examples
rx = Inches(4.4)
add_textbox(slide, "콘텐츠 예시", rx, Inches(1.7), Inches(8.5), Inches(0.45),
            font_size=16, bold=True, color=YELLOW)

examples = [
    ("자극 카피 예시", [
        "요즘 만화카페 창업 터지는 이유",
        "이 구조라서 망할 수가 없음",
    ]),
    ("보조 메시지 예시", [
        "초보도 운영 가능한 이유",
        "지금 바로 확인해보세요",
    ]),
]

y_cur = Inches(2.3)
for section_title, items in examples:
    add_textbox(slide, f"[ {section_title} ]", rx, y_cur, Inches(8.5), Inches(0.38),
                font_size=13, bold=True, color=RGBColor(0xAA, 0xAA, 0xAA))
    y_cur += Inches(0.42)
    for item in items:
        add_rect(slide, rx, y_cur, Inches(8.5), Inches(0.55), fill_color=RGBColor(0x28, 0x28, 0x28))
        add_textbox(slide, f'"{item}"', rx + Inches(0.2), y_cur + Inches(0.06),
                    Inches(8.2), Inches(0.45), font_size=13, color=WHITE)
        y_cur += Inches(0.62)
    y_cur += Inches(0.2)

# Format principles
add_textbox(slide, "포맷 원칙", rx, Inches(4.8), Inches(8.5), Inches(0.38),
            font_size=14, bold=True, color=YELLOW)
principles = [
    "상단 검정 바  →  즉각적인 시선 집중과 자극 카피",
    "중앙 매장 영상  →  현실감 있는 사업 모델 전달",
    "하단 검정 바  →  행동 유도 메시지(CTA)",
]
for i, p in enumerate(principles):
    add_textbox(slide, f"▸  {p}", rx, Inches(5.25) + i * Inches(0.45),
                Inches(8.5), Inches(0.4), font_size=12, color=RGBColor(0xCC, 0xCC, 0xCC))


# ============================================================
# SLIDE 7: Why This Strategy (3 reasons)
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_rect(slide, 0, 0, SLIDE_W, SLIDE_H, fill_color=BLACK)
add_rect(slide, 0, 0, SLIDE_W, Inches(1.5), fill_color=RGBColor(0x22, 0x22, 0x22))
add_rect(slide, 0, Inches(1.5) - Inches(0.06), SLIDE_W, Inches(0.06), fill_color=YELLOW)

add_textbox(slide, "05  채택해야 하는 이유", Inches(0.5), Inches(0.2), Inches(10), Inches(0.5),
            font_size=13, color=YELLOW)
add_textbox(slide, "이 구조를 반드시 채택해야 하는 3가지 근거",
            Inches(0.5), Inches(0.65), Inches(12), Inches(0.75),
            font_size=26, bold=True, color=WHITE)

reasons = [
    ("①", "알고리즘 최적화 및 CTR 극대화",
     [
         "반복 콘텐츠 판정 리스크 사전 차단",
         "탐색탭 노출 시 즉각 반응 유도",
         "Ad Fatigue 관리 → 지속적 클릭 유도",
     ]),
    ("②", "시각적 대비를 통한 창업 메시지 각인",
     [
         "노란색(좌우) vs 검정(중앙) 강한 대비로 시선 고정",
         "프로필 방문 시 '창업 모집' 즉각 인지",
         "브랜딩·창업 명확히 분리 → 채널 전문성 확보",
     ]),
    ("③", "자동화된 창업 전환 깔때기(Funnel) 구축",
     [
         "재미 콘텐츠로 유입 → 자연스러운 창업 노출",
         "숏폼 기반 '온라인 창업 설명회' 상시 운영",
         "저관여 유입 → 고관여 창업 문의로 전환",
     ]),
]

for i, (num, title, bullets) in enumerate(reasons):
    y = Inches(1.7) + i * Inches(1.8)
    # Number badge
    add_rect(slide, Inches(0.4), y, Inches(0.7), Inches(0.7), fill_color=YELLOW)
    add_textbox(slide, num, Inches(0.4), y, Inches(0.7), Inches(0.7),
                font_size=22, bold=True, color=BLACK, align=PP_ALIGN.CENTER)
    # Title
    add_textbox(slide, title, Inches(1.3), y, Inches(11.5), Inches(0.6),
                font_size=17, bold=True, color=WHITE)
    # Bullets
    for j, b in enumerate(bullets):
        bx = Inches(1.3) + (j % 3) * Inches(3.8)
        by = y + Inches(0.65)
        add_rect(slide, bx, by, Inches(3.6), Inches(0.85), fill_color=RGBColor(0x25, 0x25, 0x25))
        add_rect(slide, bx, by, Inches(0.05), Inches(0.85), fill_color=YELLOW)
        add_textbox(slide, b, bx + Inches(0.15), by + Inches(0.1), Inches(3.35), Inches(0.7),
                    font_size=11, color=RGBColor(0xCC, 0xCC, 0xCC))


# ============================================================
# SLIDE 8: Expected Results / Funnel
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_rect(slide, 0, 0, SLIDE_W, SLIDE_H, fill_color=BLACK)
add_rect(slide, 0, 0, SLIDE_W, Inches(1.5), fill_color=RGBColor(0x22, 0x22, 0x22))
add_rect(slide, 0, Inches(1.5) - Inches(0.06), SLIDE_W, Inches(0.06), fill_color=YELLOW)

add_textbox(slide, "06  최종 기대효과", Inches(0.5), Inches(0.2), Inches(10), Inches(0.5),
            font_size=13, color=YELLOW)
add_textbox(slide, "자동화 창업 전환 깔때기 (Funnel)",
            Inches(0.5), Inches(0.65), Inches(12), Inches(0.75),
            font_size=28, bold=True, color=WHITE)

# Funnel steps
funnel_steps = [
    (YELLOW, BLACK, "STEP 1", "브랜딩 콘텐츠 노출", "공감 밈 / 상황극 → 자연스러운 팔로우 & 유입", Inches(9.0)),
    (RGBColor(0xE5, 0xC2, 0x00), BLACK, "STEP 2", "프로필 방문 & 피드 탐색", "3열 구조에서 창업 라인 자연 노출", Inches(8.5)),
    (RGBColor(0xCC, 0xAA, 0x00), BLACK, "STEP 3", "창업 콘텐츠 시청", "자극 카피 → 매장 영상 → 보조 메시지 흡수", Inches(8.0)),
    (RGBColor(0xAA, 0x88, 0x00), WHITE, "STEP 4", "창업 문의 전환", "링크 클릭 / DM / 전화 → 실제 창업 상담 연결", Inches(7.5)),
]

for i, (bg, fg, step, title, desc, width) in enumerate(funnel_steps):
    y = Inches(1.7) + i * Inches(1.2)
    center_x = (SLIDE_W - width) / 2
    add_rect(slide, center_x, y, width, Inches(1.0), fill_color=bg)
    add_textbox(slide, f"{step}  |  {title}", center_x + Inches(0.3), y + Inches(0.05),
                width - Inches(0.4), Inches(0.45), font_size=14, bold=True, color=fg)
    add_textbox(slide, desc, center_x + Inches(0.3), y + Inches(0.5),
                width - Inches(0.4), Inches(0.45), font_size=12, color=RGBColor(0x33, 0x33, 0x33) if fg == BLACK else RGBColor(0xDD, 0xDD, 0xDD))

# Final message
add_rect(slide, Inches(1.0), Inches(6.4), Inches(11.3), Inches(0.75), fill_color=YELLOW)
add_textbox(slide, '"브랜딩으로 끌어오고  →  가운데에서 창업으로 전환시키는 구조"',
            Inches(1.0), Inches(6.4), Inches(11.3), Inches(0.75),
            font_size=16, bold=True, color=BLACK, align=PP_ALIGN.CENTER)


# ============================================================
# SLIDE 9: Action Plan
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_rect(slide, 0, 0, SLIDE_W, SLIDE_H, fill_color=BLACK)
add_rect(slide, 0, 0, Inches(0.6), SLIDE_H, fill_color=YELLOW)
add_rect(slide, 0, SLIDE_H - Inches(0.12), SLIDE_W, Inches(0.12), fill_color=YELLOW)

add_textbox(slide, "실행 로드맵", Inches(1.1), Inches(0.4), Inches(10), Inches(0.6),
            font_size=30, bold=True, color=WHITE, align=PP_ALIGN.LEFT)

phases = [
    ("PHASE 1\n1~2주차", "피드 세팅", [
        "3열 구조 피드 레이아웃 확정",
        "브랜딩 콘텐츠 10개 선제작",
        "창업 포맷 템플릿 3종 제작",
    ]),
    ("PHASE 2\n3~4주차", "콘텐츠 런칭", [
        "주 3회 이상 업로드 루틴 구축",
        "브랜딩 2 : 창업 1 비율 유지",
        "해시태그 전략 적용",
    ]),
    ("PHASE 3\n5~8주차", "전환 최적화", [
        "창업 문의 전환율 데이터 수집",
        "고반응 콘텐츠 유형 분석 & 강화",
        "CTA 메시지 A/B 테스트",
    ]),
    ("PHASE 4\n9주차~", "자동화 완성", [
        "콘텐츠 제작 파이프라인 정착",
        "월간 성과 리포트 체계화",
        "창업 설명회 연계 캠페인 운영",
    ]),
]

col_w = Inches(2.9)
for i, (phase, title, items) in enumerate(phases):
    x = Inches(1.1) + i * (col_w + Inches(0.22))
    y = Inches(1.3)
    # Phase header
    add_rect(slide, x, y, col_w, Inches(1.0), fill_color=YELLOW)
    add_textbox(slide, phase, x, y, col_w, Inches(1.0),
                font_size=13, bold=True, color=BLACK, align=PP_ALIGN.CENTER)
    # Title
    add_rect(slide, x, y + Inches(1.0), col_w, Inches(0.55), fill_color=RGBColor(0x33, 0x33, 0x33))
    add_textbox(slide, title, x, y + Inches(1.0), col_w, Inches(0.55),
                font_size=14, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    # Items
    for j, item in enumerate(items):
        iy = y + Inches(1.65) + j * Inches(0.75)
        add_rect(slide, x, iy, col_w, Inches(0.65), fill_color=RGBColor(0x22, 0x22, 0x22))
        add_rect(slide, x, iy, Inches(0.05), Inches(0.65), fill_color=YELLOW)
        add_textbox(slide, item, x + Inches(0.15), iy + Inches(0.1),
                    col_w - Inches(0.2), Inches(0.5), font_size=11, color=WHITE)

add_textbox(slide, "체계적인 단계별 실행으로 SNS 채널을 창업 전환 머신으로 성장시킵니다.",
            Inches(1.1), Inches(6.7), Inches(11.5), Inches(0.45),
            font_size=12, color=RGBColor(0xAA, 0xAA, 0xAA), align=PP_ALIGN.CENTER)


# Save
output_path = "/home/user/-/벌툰_SNS채널운영기획안.pptx"
prs.save(output_path)
print(f"Saved: {output_path}")
