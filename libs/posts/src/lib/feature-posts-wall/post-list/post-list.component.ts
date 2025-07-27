import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { PostInputComponent } from '../../ui/post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { debounceTime, firstValueFrom, fromEvent } from 'rxjs';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }
  postService = inject(PostService);
  posts = this.postService.posts;
  render2 = inject(Renderer2);

  // hostElement = inject(ElementRef);
  // @HostListener('window:resize', ['$event'])
  // onWindowResize(event: Event) {
  //   this.resizedList();
  // }

  @ViewChild('wrapper') wrapper!: ElementRef;

  ngAfterViewInit(): void {
    this.resizedList();

    fromEvent(window, 'resize')
      .pipe(debounceTime(30))
      .subscribe(() => {
        console.log('resize');
        this.resizedList();
      });
  }

  resizedList() {
    const { top } = this.wrapper.nativeElement.getBoundingClientRect();
    console.log('top: ', top);

    const height = window.innerHeight - top - 24 - 24;
    this.render2.setStyle(this.wrapper.nativeElement, 'height', `${height}px`);
  }
}
