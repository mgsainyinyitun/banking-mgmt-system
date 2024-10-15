'use client'
import { Accordion, AccordionItem } from '@nextui-org/react'
import React from 'react'
import { FAQ } from './faq'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FaqComponent = () => {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Accordion>
                {
                    FAQ.map((item, index) => {
                        return (
                            <AccordionItem
                                key={index}
                                aria-label={item.question}
                                startContent={
                                    <FontAwesomeIcon icon={item.icon} size='lg' className='text-primary-400 hidden sm:block' />
                                }
                                subtitle={<span className="text-sm sm:text-base">{item.topic}</span>}
                                title={<p className='text-primary-400 text-lg sm:text-xl'>{item.question}</p>}
                                className="py-2"
                            >
                                <div className="text-sm sm:text-base">{item.answer}</div>
                            </AccordionItem>
                        )
                    })
                }
            </Accordion>
        </div>
    )
}

export default FaqComponent