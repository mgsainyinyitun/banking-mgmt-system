'use client'
import { Accordion, AccordionItem } from '@nextui-org/react'
import React from 'react'
import { FAQ } from './faq'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FaqComponent = () => {
    return (
        <Accordion selectionMode="multiple">
            {
                FAQ.map((item, index) => {
                    return (
                        <AccordionItem
                            key={index}
                            aria-label={item.question}
                            startContent={
                                <FontAwesomeIcon icon={item.icon} size='lg' className='text-primary-400' />
                            }
                            subtitle={item.topic}
                            title={<p className='text-primary-400 text-xl'>{item.question}</p>}
                        >
                            {item.answer}
                        </AccordionItem>
                    )
                })
            }

        </Accordion>
    )
}

export default FaqComponent