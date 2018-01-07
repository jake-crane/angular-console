import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import Content from '../../models/Content';

@Injectable()
export class ContentManagementService {

  constructor(private http: HttpClient) { }

  private subject: BehaviorSubject<Content> = new BehaviorSubject(null);

  getSubject(): BehaviorSubject<Content> {
    return this.subject;
  }

  parse(xml: string): Content {
    const xmlDoc = new DOMParser().parseFromString(xml, 'text/xml');
    const deviceNode = xmlDoc.querySelector('device');
    const imageUrlNode = xmlDoc.querySelector('imageUrl');
    const xfRenderingServerNode = xmlDoc.querySelector('xfRenderingServer');
    const maxFileUploadSizeNode = xmlDoc.querySelector('maxFileUploadSize');
    const maxImageDpiNode = xmlDoc.querySelector('maxImageDpi');
    const minImageDpiNode = xmlDoc.querySelector('minImageDpi');
    const maxImagePixelsNode = xmlDoc.querySelector('maxImagePixels');
    const minImagePixelsNode = xmlDoc.querySelector('minImagePixels');
    return {
      device: deviceNode && deviceNode.textContent,
      imageUrl: imageUrlNode && imageUrlNode.textContent,
      xfRenderingServer: xfRenderingServerNode && xfRenderingServerNode.textContent,
      maxFileUploadSize: maxFileUploadSizeNode && maxFileUploadSizeNode.textContent,
      maxImageDpi: maxImageDpiNode && maxImageDpiNode.textContent,
      minImageDpi: minImageDpiNode && minImageDpiNode.textContent,
      maxImagePixels: maxImagePixelsNode && maxImagePixelsNode.textContent,
      minImagePixels: minImagePixelsNode && minImagePixelsNode.textContent
    };
  }

  handleResponse(xml: string) {
    this.subject.next(this.parse(xml));
  }

  initContent(): void {
    this.http.get('./communications/contentmanagement', { responseType: 'text' })
      .subscribe(this.handleResponse.bind(this));
  }

}
