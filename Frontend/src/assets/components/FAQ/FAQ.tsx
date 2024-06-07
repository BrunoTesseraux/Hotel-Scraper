import React, { useState, useRef, useEffect } from 'react';
import "./FAQ.scss";

const FAQ: React.FC = () => {
    const [openQuestion, setOpenQuestion] = useState<string>('faq1');
    const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const toggleQuestion = (question: string) => {
        setOpenQuestion(prevQuestion => (prevQuestion === question ? prevQuestion : question));
    };

    useEffect(() => {
        Object.keys(contentRefs.current).forEach(key => {
            const content = contentRefs.current[key];
            if (content) {
                if (key === openQuestion) {
                    content.style.height = content.scrollHeight + 'px';
                } else {
                    content.style.height = '0px';
                }
            }
        });
    }, [openQuestion]);

    return (
        <div className="faq-container">
            <div className="faq-card">
                <h2
                    className={openQuestion === 'faq1' ? 'active' : ''}
                    onClick={() => toggleQuestion('faq1')}
                >
                    FAQ
                </h2>
                <div
                    ref={el => (contentRefs.current['faq1'] = el)}
                    className={`faq-answer ${openQuestion === 'faq1' ? 'open' : ''}`}
                >
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, minus.</p>
                </div>

                <h2
                    className={openQuestion === 'faq2' ? 'active' : ''}
                    onClick={() => toggleQuestion('faq2')}
                >
                    FAQ 2
                </h2>
                <div
                    ref={el => (contentRefs.current['faq2'] = el)}
                    className={`faq-answer ${openQuestion === 'faq2' ? 'open' : ''}`}
                >
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut laboriosam quisquam quo quam possimus vel quis maxime unde dolorem beatae corporis earum optio dolores iste expedita quaerat natus, doloremque odio?</p>
                </div>

                <h2
                    className={openQuestion === 'faq3' ? 'active' : ''}
                    onClick={() => toggleQuestion('faq3')}
                >
                    FAQ 3
                </h2>
                <div
                    ref={el => (contentRefs.current['faq3'] = el)}
                    className={`faq-answer ${openQuestion === 'faq3' ? 'open' : ''}`}
                >
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, minus.</p>
                </div>

                <h2
                    className={openQuestion === 'faq4' ? 'active' : ''}
                    onClick={() => toggleQuestion('faq4')}
                >
                    FAQ 4
                </h2>
                <div
                    ref={el => (contentRefs.current['faq4'] = el)}
                    className={`faq-answer ${openQuestion === 'faq4' ? 'open' : ''}`}
                >
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, minus.</p>
                </div>
            </div>
        </div>
    );
};

export default FAQ;