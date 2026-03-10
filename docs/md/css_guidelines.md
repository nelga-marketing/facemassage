# CSS Guidelines

## Invariants

1. CSS делится ровно на три файла: `constants.css`, `components.css`, `sections.css`.
2. `constants.css` содержит только CSS custom properties (`--*`) для шрифтов, размеров и цветов.
3. `components.css` содержит только переиспользуемые стили компонентов.
4. `sections.css` содержит только стили, специфичные для отдельных секций страницы.
5. Все селекторы в `components.css` должны начинаться с `.component-`.
6. Все селекторы в `sections.css` должны начинаться с `#<section-id>`.
7. Имена классов, id, custom properties и идентификаторов должны быть только в dashed-lowercase.
8. Отступы везде только табами.
9. Между selector-style blocks не должно быть пустых строк.
10. Все selector-style blocks должны быть сгруппированы в CSS code blocks.
11. CSS code block — это группа selector-style blocks, относящихся к одному компоненту в `components.css` или к одной секции страницы в `sections.css`.
12. Каждый CSS code block обязан начинаться строкой-комментарием вида `/* ------------------------------ <code block name> ------------------------------ */`.
13. Над и под строкой заголовка CSS code block должна быть ровно одна пустая строка.
14. Внутри одного CSS code block selector-style blocks идут подряд без пустых строк.
15. Селекторы могут использовать только class, id и descendant combinator через пробел.
16. Символы `[]` и `>` в селекторах запрещены.
17. Пробел в селекторе допускается только между descendant items.
18. Если более специфичный селектор присутствует, прямо над ним должен быть объявлен селектор на один шаг менее специфичный.
19. Менее специфичный селектор обязан быть объявлен даже если он пустой.
20. Каждый следующий уровень специфичности должен быть сдвинут на один дополнительный таб.
21. Количество табов перед селектором должно равняться глубине его специфичности в code block hierarchy.
22. Свойства внутри блока должны быть на один таб глубже, чем сам селектор.
23. Закрывающая `}` должна иметь тот же уровень табов, что и строка селектора.
24. Структура должна идти сверху вниз как `less specific -> more specific`.
25. Повторяющийся визуальный паттерн должен жить в `components.css`.
26. Локальная особенность конкретной секции страницы должна жить в `sections.css`.
27. Переиспользуемые цвета, размеры и шрифты должны выноситься в `constants.css`.
28. В `components.css` и `sections.css` нельзя хардкодить такие значения, если они могут быть выражены через константы.
29. Форматирование и иерархическая явность важнее краткости.
30. Любой CSS вне CSS code block считается невалидным.

Самая важная правка тут именно эта:

**Не “comment sections”, а “CSS code blocks”.**

И определение теперь такое:
**CSS code block = группа selector-style blocks, принадлежащих одному компоненту или одной page section.**

## Example

### `constants.css`

```css
/* ------------------------------ typography ------------------------------ */

:root {
	--font-family-base: 'inter', sans-serif;
	--font-size-hero-title: 64px;
	--font-size-section-title: 36px;
	--font-size-body: 18px;
}

/* ------------------------------ colors ------------------------------ */

:root {
	--color-page-background: #f7f3ee;
	--color-surface-primary: #ffffff;
	--color-text-primary: #1f1f1f;
	--color-text-muted: #6b645d;
	--color-accent-primary: #c89b6d;
}

/* ------------------------------ spacing ------------------------------ */

:root {
	--radius-card: 24px;
	--space-section-y: 96px;
	--space-card-padding: 32px;
	--space-button-x: 24px;
	--space-button-y: 14px;
}
```

### `components.css`

```css
/* ------------------------------ component-button ------------------------------ */

.component-button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: var(--space-button-y) var(--space-button-x);
	border-radius: var(--radius-card);
	font-family: var(--font-family-base);
	font-size: var(--font-size-body);
	color: var(--color-surface-primary);
	background: var(--color-accent-primary);
	text-decoration: none;
}
	.component-button .component-button-label {
		display: inline-block;
	}

/* ------------------------------ component-card ------------------------------ */

.component-card {
	padding: var(--space-card-padding);
	border-radius: var(--radius-card);
	background: var(--color-surface-primary);
}
	.component-card .component-card-title {
		margin: 0;
		font-family: var(--font-family-base);
		font-size: var(--font-size-section-title);
		color: var(--color-text-primary);
	}
	.component-card .component-card-text {
		margin: 0;
		font-family: var(--font-family-base);
		font-size: var(--font-size-body);
		color: var(--color-text-muted);
	}
```

### `sections.css`

```css
/* ------------------------------ hero-section ------------------------------ */

#hero-section {
	padding: var(--space-section-y) 0;
	background: var(--color-page-background);
}
	#hero-section .hero-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
		#hero-section .hero-container .hero-content {
			max-width: 640px;
		}
			#hero-section .hero-container .hero-content .hero-title {
				margin: 0;
				font-family: var(--font-family-base);
				font-size: var(--font-size-hero-title);
				color: var(--color-text-primary);
			}
			#hero-section .hero-container .hero-content .hero-subtitle {
				margin: 24px 0 0 0;
				font-family: var(--font-family-base);
				font-size: var(--font-size-body);
				color: var(--color-text-muted);
			}
			#hero-section .hero-container .hero-content .hero-actions {
				margin-top: 32px;
			}
		#hero-section .hero-container .hero-media {
			width: 480px;
		}

/* ------------------------------ testimonials-section ------------------------------ */

#testimonials-section {
	padding: var(--space-section-y) 0;
	background: var(--color-surface-primary);
}
	#testimonials-section .testimonials-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}
		#testimonials-section .testimonials-container .testimonial-item {
		}
			#testimonials-section .testimonials-container .testimonial-item .testimonial-quote {
				margin: 0;
				font-family: var(--font-family-base);
				font-size: var(--font-size-body);
				color: var(--color-text-primary);
			}
			#testimonials-section .testimonials-container .testimonial-item .testimonial-author {
				margin-top: 16px;
				font-family: var(--font-family-base);
				font-size: var(--font-size-body);
				color: var(--color-text-muted);
			}
```

## Clarification

But there is one possible friction point in this approach: the rule “number of tabs = specificity” is visually elegant, but CSS specificity and descendant-chain depth are not the same thing. In the example above, this is interpreted as **depth of selector chain**, not formal CSS specificity.

A more precise invariant would be:

**indentation level equals selector depth inside the code block hierarchy**
