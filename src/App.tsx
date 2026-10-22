import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import type { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { analyzeSEO } from 'seo-engine-bar';
import {
  ArrowClockwise,
  ArrowCounterClockwise,
  CheckCircle,
  ListBullets,
  ListNumbers,
  Quotes,
  ChartDonutIcon,
  TextB,
  TextHOne,
  TextHTwo,
  TextItalic,
  WarningCircle,
} from '@phosphor-icons/react';
import './App.css';

type MenuBarProps = {
  editor: Editor | null;
};

function MenuBar({ editor }: MenuBarProps) {
  if (!editor) return null;

  const buttonClass = (active = false) =>
    `toolbar-button${active ? ' is-active' : ''}`;

  return (
    <div className="editor-toolbar" role="toolbar" aria-label="Text formatting">
      <div className="toolbar-group">
        <button
          aria-label="Undo"
          className="toolbar-button"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo"
          type="button"
        >
          <ArrowCounterClockwise size={18} />
        </button>
        <button
          aria-label="Redo"
          className="toolbar-button"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
          title="Redo"
          type="button"
        >
          <ArrowClockwise size={18} />
        </button>
      </div>
      <span className="toolbar-divider" />
      <div className="toolbar-group">
        <button
          aria-label="Heading 1"
          aria-pressed={editor.isActive('heading', { level: 1 })}
          className={buttonClass(editor.isActive('heading', { level: 1 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          title="Heading 1"
          type="button"
        >
          <TextHOne size={18} />
        </button>
        <button
          aria-label="Heading 2"
          aria-pressed={editor.isActive('heading', { level: 2 })}
          className={buttonClass(editor.isActive('heading', { level: 2 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Heading 2"
          type="button"
        >
          <TextHTwo size={18} />
        </button>
        <button
          aria-label="Bold"
          aria-pressed={editor.isActive('bold')}
          className={buttonClass(editor.isActive('bold'))}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
          type="button"
        >
          <TextB size={18} />
        </button>
        <button
          aria-label="Italic"
          aria-pressed={editor.isActive('italic')}
          className={buttonClass(editor.isActive('italic'))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
          type="button"
        >
          <TextItalic size={18} />
        </button>
      </div>
      <span className="toolbar-divider" />
      <div className="toolbar-group">
        <button
          aria-label="Bulleted list"
          aria-pressed={editor.isActive('bulletList')}
          className={buttonClass(editor.isActive('bulletList'))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bulleted list"
          type="button"
        >
          <ListBullets size={18} />
        </button>
        <button
          aria-label="Numbered list"
          aria-pressed={editor.isActive('orderedList')}
          className={buttonClass(editor.isActive('orderedList'))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered list"
          type="button"
        >
          <ListNumbers size={18} />
        </button>
        <button
          aria-label="Blockquote"
          aria-pressed={editor.isActive('blockquote')}
          className={buttonClass(editor.isActive('blockquote'))}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Blockquote"
          type="button"
        >
          <Quotes size={18} />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [title, setTitle] = useState('Building Scalable React Applications in 2026');
  const [slug, setSlug] = useState('building-scalable-react-apps');
  const [description, setDescription] = useState(
    'Explore modern techniques for building high-performance, maintainable React web applications with real-time SEO scoring.',
  );
  const [focusKeyword, setFocusKeyword] = useState('React applications');
  const [bodyText, setBodyText] = useState(
    'Building scalable React applications starts with a clear architecture. Break your interface into focused components, keep state close to where it is used, and make data flow easy to follow. These fundamentals make a codebase easier to understand as your product grows.\n\nPerformance should be part of the design, not a last-minute patch. Measure real user journeys, split code at meaningful boundaries, and avoid rendering work that does not change the screen. A fast experience helps visitors stay engaged and gives search engines a better page to index.\n\nGreat React applications also need thoughtful content. Use descriptive headings, concise metadata, and useful examples that answer the questions your audience is searching for. Combine strong writing with accessible interactions and reliable testing to create experiences people trust.',
  );

  const editor = useEditor({
    extensions: [StarterKit],
    content: `<p>${bodyText.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`,
    onUpdate: ({ editor: updatedEditor }) => {
      setBodyText(updatedEditor.getText());
    },
  });

  const analysis = analyzeSEO({ title, description, slug, focusKeyword, bodyText });
  const wordCount = bodyText.trim().split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 200));
  const goodChecks = analysis.details.filter((item) => item.type === 'good');
  const improvements = analysis.details.filter((item) => item.type !== 'good');
  const scoreTone =
    analysis.score >= 80 ? 'strong' : analysis.score >= 60 ? 'steady' : 'needs-work';

  return (
    <main className="studio-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Searchlight home">
          <span className="brand-mark"><ChartDonutIcon size={32} /></span>
          <span>MedoIIehab/SEO-Engine-Bar<span className="brand-period">.</span></span>
        </a>
        <div className="topbar-meta">
          <span className="draft-indicator"><span /> Draft workspace</span>
          <span className="topbar-divider" />
          <span className="topbar-caption">SEO content studio</span>
        </div>
      </header>

      <section className="page-heading">
        <div>
          <p className="eyebrow">CONTENT WORKSPACE <span>·</span> NEW ARTICLE</p>
          <h1>Make every word work harder.</h1>
          <p className="page-description">
            Shape your story and fine-tune your search presence as you write.
          </p>
        </div>
      </section>

      <div className="workspace-grid">
        <section className="writing-column" aria-label="Article editor">
          <div className="panel article-panel">
            <div className="panel-heading">
              <div>
                <span className="section-kicker">01 / ARTICLE DETAILS</span>
                <h2>Set up your story</h2>
              </div>
              {/* <span className="panel-icon"><TextB size={18} /></span> */}
            </div>

            <div className="field-block title-field">
              <label htmlFor="article-title">Article title</label>
              <input
                id="article-title"
                className="text-input title-input"
                maxLength={100}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Give your article a clear, compelling title"
                value={title}
              />
              <div className="field-foot">
                <span>Keep it clear and specific</span>
                <span className={title.length > 60 ? 'count-warning' : ''}>{title.length}<span className="count-limit"> / 60 recommended</span></span>
              </div>
            </div>

            <div className="field-row">
              <div className="field-block">
                <label htmlFor="url-slug">URL slug</label>
                <div className="input-prefix">
                  <span>mysite.com/</span>
                  <input
                    id="url-slug"
                    className="text-input"
                    onChange={(event) => setSlug(event.target.value)}
                    placeholder="your-article-url"
                    value={slug}
                  />
                </div>
              </div>
              <div className="field-block">
                <label htmlFor="focus-keyword">Focus keyword</label>
                <input
                  id="focus-keyword"
                  className="text-input"
                  onChange={(event) => setFocusKeyword(event.target.value)}
                  placeholder="What are readers searching for?"
                  value={focusKeyword}
                />
              </div>
            </div>

            <div className="field-block description-field">
              <div className="label-row">
                <label htmlFor="meta-description">Meta description</label>
                <span className={description.length > 160 ? 'count-warning' : ''}>{description.length}<span className="count-limit"> / 160</span></span>
              </div>
              <textarea
                id="meta-description"
                className="text-input"
                maxLength={300}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Summarize the value of your article in search results"
                rows={3}
                value={description}
              />
              <div className="field-foot">
                <span>A useful summary earns the click</span>
                <span>Recommended: 120–160 characters</span>
              </div>
            </div>
          </div>

          <div className="panel editor-panel">
            <div className="panel-heading editor-heading">
              <div>
                <span className="section-kicker">02 / THE STORY</span>
                <h2>Write something worth finding</h2>
              </div>
              <span className="editor-status"><span /> Writing space</span>
            </div>
            <div className="editor-frame">
              <MenuBar editor={editor} />
              <EditorContent
                aria-label="Article body"
                className="editor-content"
                editor={editor}
              />
              {!bodyText && (
                <div className="editor-placeholder">Start with a compelling introduction...</div>
              )}
            </div>
            <footer className="editor-footer">
              <span>{wordCount.toLocaleString()} words</span>
              <span className="footer-dot">·</span>
              <span>{readingMinutes} min read</span>
              <span className="editor-footer-hint">Use headings to give your article structure</span>
            </footer>
          </div>
        </section>

        <aside className="insights-column" aria-label="SEO insights">
          <section className="panel score-panel">
            <div className="panel-heading">
              <div>
                <span className="section-kicker">03 / SEARCH READINESS</span>
                <h2>Your SEO overview</h2>
              </div>
            </div>

            <div className={`score-summary ${scoreTone}`}>
              <div
                aria-label={`SEO score ${analysis.score} out of 100`}
                className="score-ring"
                role="img"
                style={{ background: `conic-gradient(var(--score-color) ${analysis.score * 3.6}deg, #edf0f5 0deg)` }}
              >
                <div className="score-ring-inner">
                  <strong>{analysis.score}</strong>
                  <span>out of 100</span>
                </div>
              </div>
              <div className="score-copy">
                <span className="score-caption">SEO SCORE</span>
                <h3>
                  {analysis.score >= 80
                    ? 'Looking great'
                    : analysis.score >= 60
                      ? 'Good foundation'
                      : 'Room to improve'}
                </h3>
                <p>{goodChecks.length} of {analysis.details.length} checks looking good</p>
              </div>
            </div>

            <div className="score-scale">
              <div className="scale-labels"><span>Needs work</span><span>Great</span></div>
              <div className="scale-track"><span style={{ width: `${analysis.score}%` }} /></div>
            </div>

            <div className="checks-section">
              <div className="checks-heading">
                <h3>Content checks</h3>
                <span>{analysis.details.length} checks</span>
              </div>
              <div className="check-list">
                {analysis.details.map((item, index) => (
                  <div className={`check-item ${item.type}`} key={`${item.message}-${index}`}>
                    <span className="check-icon">
                      {item.type === 'good'
                        ? <CheckCircle size={17} weight="fill" />
                        : <WarningCircle size={17} weight="fill" />}
                    </span>
                    <span>{item.message}</span>
                  </div>
                ))}
              </div>
            </div>

            {improvements.length > 0 && (
              <div className="next-step">
             <ChartDonutIcon size={17} />
                <p><strong>Next step</strong> — {improvements[0].message}</p>
              </div>
            )}
          </section>

          <section className="panel preview-panel">
            <div className="panel-heading preview-heading">
              <div>
                <span className="section-kicker">04 / SEARCH PREVIEW</span>
                <h2>How it may appear</h2>
              </div>
              <span className="preview-device">Google</span>
            </div>
            <div className="search-result">
              <div className="result-site">
                <span className="site-favicon">s</span>
                <div><strong>mysite.com</strong><span>https://mysite.com › {slug || 'article-url'}</span></div>
              </div>
              <h3>{title || 'Your article title will appear here'}</h3>
              <p>{description || 'Add a meta description to help readers understand your article.'}</p>
            </div>
          </section>

          <div className="writing-stats">
            <div><span>WORDS</span><strong>{wordCount.toLocaleString()}</strong></div>
            <span className="stats-divider" />
            <div><span>READ TIME</span><strong>{readingMinutes} <small>min</small></strong></div>
          </div>
        </aside>
      </div>
      <footer className="page-footer">
        <span><ChartDonutIcon size={14} /> Thoughtful content, stronger search presence.</span>
        <span>MedoIIehab/SEO-engine-bar</span>
      </footer>
    </main>
  );
}
