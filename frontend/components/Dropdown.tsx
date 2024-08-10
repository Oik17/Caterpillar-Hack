"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataProps{
    onDataReceive:(value:string)=>void
}

export function DropdownMenuRadioGroupDemo({onDataReceive}:DataProps) {
    const [position, setPosition] = React.useState("select")
    const sendDataToParent = (value:string) => {
    onDataReceive(value); 
  };
    const handleValueChange = (value:string)=>{
        setPosition(value)
        sendDataToParent(value)
    }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="md:w-[300px] bg-yellow-200 hover:bg-yellow-100">{position}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={handleValueChange}>
          <DropdownMenuRadioItem value="Excaviator">Excaviator</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Articulated Truck">Articulated Truck</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Backhoe Loader">Backhoe Loader</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Dozer">Dozer</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
