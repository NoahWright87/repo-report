import { Heading } from '@noahwright/design';
import type { QASlide } from '../../types/report';
import './QASlideContent.css';

export function QASlideContent({ slide }: { slide: QASlide }) {
  return (
    <div className="rr-qa">
      <Heading level={1}>{slide.title}</Heading>
      {slide.contact && slide.contact.length > 0 && (
        <ul className="rr-qa__contact">
          {slide.contact.map((item, i) => (
            <li key={i}>
              {item.url
                ? <a href={item.url} target="_blank" rel="noopener noreferrer">{item.text}</a>
                : item.text
              }
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
