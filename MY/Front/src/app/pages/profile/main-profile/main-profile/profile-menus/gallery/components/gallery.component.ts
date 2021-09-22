import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { APP_CONFIG, IAppConfig } from 'src/app/core/config/app.config';
import { GalleryService } from './../services/gallery.service';
import { EditModel } from './../model/edit-model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  items: GalleryItem[];
  addGalleryFG: FormGroup;
  imageData: any;
  galleryItems: any;
  file: any;
  model = {} as EditModel;

  constructor(public gallery: Gallery,
    public lightbox: Lightbox,
    @Inject(APP_CONFIG) public appConfig: IAppConfig,
    private galleryeService: GalleryService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initialForm();
    this.fetchData();

  }

  fetchData() {
    this.galleryeService.GetAllGallery()
      .subscribe(data => {
        this.galleryItems = data.result;
        this.imageData = data.result.map((item) => {
          return {
            srcUrl: this.appConfig.apiEndpoint + '/gallery/GetImageGallery/' + item.id,
            previewUrl: this.appConfig.apiEndpoint + '/gallery/GetImageGallery/' + item.id
          }
        })
        this.configLightBox(this.imageData);
      })
  }

  initialForm(): void {
    this.addGalleryFG = this.formBuilder.group({
      id: [],
      title: [this.model.title, Validators.compose([Validators.required])],
      description: [this.model.description, Validators.compose([Validators.required])],
      country: [this.model.country, Validators.compose([Validators.required])],
      city: [this.model.city, Validators.compose([Validators.required])],
      imageData: [this.file, Validators.compose([Validators.required])]
    })
  }

  uploadGalleryImage(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.addGalleryFG.patchValue({ imageData: file })
    }
  }

  SendItem(): void {
    if (this.model.id) {
      this.galleryeService.editGallery(this.addGalleryFG.value).subscribe((data) => {
       this.fetchData();
      });
    } else {
      this.galleryeService.addGallery(this.addGalleryFG.value).subscribe(() => {
        this.fetchData();
      });
    }
  }

  onClickForUpload() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.click();
  }

  SetLocation(event) {
    this.addGalleryFG.patchValue({ country: event.country, city: event.name })
  }

  configLightBox(items): void {
    this.items = items.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));

    const lightboxRef = this.gallery.ref('lightbox');

    lightboxRef.setConfig({
      imageSize: ImageSize.Contain,
    });

    lightboxRef.load(this.items);
  }

  setItem(item) {
    this.model = item;
    this.addGalleryFG.patchValue(item);
  }
}
